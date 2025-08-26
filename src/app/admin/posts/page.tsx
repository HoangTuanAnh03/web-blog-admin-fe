"use client"

import React, { useState, useCallback, useMemo } from "react"
import { usePostQuery, deletePost, PostFilters } from "@/hooks/useAdminQuery"
import { BlogPost } from "@/types/api"
import { ViewMode } from "@/types/category"
import { toast } from "@/hooks/use-toast"
import { Loader2, Search, Grid3X3, List } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { PostsTable } from "@/components/posts/posts-table"
import { PostsGrid } from "@/components/posts/posts-grid"
import { DeletePostDialog } from "@/components/posts/delete-post-dialog"
import { PostDetailModal } from "@/components/posts/post-detail-modal"

export default function PostsPage() {
  // Search states
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // UI states
  const [currentPage, setCurrentPage] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch data với React Query
  const { data, isLoading, error, refetch } = usePostQuery({
    page: currentPage,
    search: searchQuery,
  })

  // Extract pagination info từ API response
  const paginationInfo = useMemo(() => {
    return data?.data ? {
      totalElements: data.data.totalElements,
      totalPages: data.data.totalPages,
      currentPage: data.data.number,
      pageSize: data.data.size,
      isFirst: data.data.first,
      isLast: data.data.last,
      isEmpty: data.data.empty,
      hasContent: data.data.content.length > 0
    } : null
  }, [data])

  // Event Handlers
  const handleSearchClick = useCallback(() => {
    setSearchQuery(searchInput.trim())
    setCurrentPage(0)
  }, [searchInput])

  const handleSearchKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }, [handleSearchClick])

  const handleClearSearch = useCallback(() => {
    setSearchInput("")
    setSearchQuery("")
    setCurrentPage(0)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleDeletePost = useCallback((post: BlogPost) => {
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }, [])

  const handleViewPost = useCallback((post: BlogPost) => {
    setPreviewPost(post)
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!postToDelete) return

    setIsDeleting(true)
    try {
      const response = await deletePost(postToDelete.id)
      
      if (response) {
        await refetch()
        setDeleteDialogOpen(false)
        setPostToDelete(null)
        toast({
          title: "Xóa thành công",
          description: `Bài viết "${postToDelete.title}" đã được xóa.`,
          variant: "default",
        })
      } else {
        throw new Error("Delete failed")
      }
    } catch (error) {
      toast({
        title: "Xóa thất bại",
        description: "Không thể xóa bài viết này.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }, [postToDelete, refetch])

  const getPageNumbers = useCallback(() => {
    if (!paginationInfo) return []

    const totalPages = paginationInfo.totalPages
    const current = currentPage
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }

    let startPage = Math.max(0, current - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage >= totalPages) {
      endPage = totalPages - 1
      startPage = Math.max(0, endPage - maxPagesToShow + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [currentPage, paginationInfo])

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(0)
  }, [searchQuery])

  // Loading state
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="flex justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Đang tải bài viết...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="text-center py-12">
            <div className="text-destructive mb-2">⚠️ Có lỗi xảy ra</div>
            <p className="text-muted-foreground">{error.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 text-primary hover:underline"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header Section */}
          <div className=" space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Quản Lý Bài Viết
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Quản lý và theo dõi tất cả bài viết trong hệ thống admin
            </p>
          </div>

          {/* Search & Filter Section */}
          <Card className="shadow-sm border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      className="pl-10 h-11 bg-background"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleSearchKeyPress}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSearchClick}
                      disabled={isLoading}
                      className="gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Tìm kiếm
                    </Button>
                    
                    {searchQuery && (
                      <Button 
                        variant="outline" 
                        onClick={handleClearSearch}
                        disabled={isLoading}
                      >
                        Xóa bộ lọc
                      </Button>
                    )}
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-lg p-1 bg-background">
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="h-8 px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 px-3"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Search Status */}
              {searchQuery && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Đang tìm kiếm: <span className="font-medium text-foreground">{searchQuery}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Section */}
          <div>
            {/* Loading overlay */}
            {isLoading && (
              <div className="relative">
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>
            )}

            {data && paginationInfo && paginationInfo.hasContent ? (
              <>

                {/* Data display */}
                <div className={isLoading ? "opacity-60 transition-opacity" : ""}>
                  {viewMode === "table" ? (
                    <PostsTable
                      posts={data.data.content}
                      totalCount={paginationInfo.totalElements}
                      onDelete={handleDeletePost}
                      onView={handleViewPost}
                      isDeleting={isDeleting}
                    />
                  ) : (
                    <PostsGrid
                      posts={data.data.content}
                      onDelete={handleDeletePost}
                      onView={handleViewPost}
                      isDeleting={isDeleting}
                    />
                  )}
                </div>

                {/* Pagination */}
                {paginationInfo.totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                          className={paginationInfo.isFirst ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {getPageNumbers().map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={pageNumber === currentPage}
                            className="cursor-pointer"
                          >
                            {pageNumber + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(Math.min(paginationInfo.totalPages - 1, currentPage + 1))}
                          className={paginationInfo.isLast ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  📝
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery ? "Không tìm thấy kết quả nào" : "Không tìm thấy bài viết nào"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? `Không có bài viết nào khớp với từ khóa "${searchQuery}". Hãy thử từ khóa khác.`
                    : "Chưa có bài viết nào trong hệ thống."
                  }
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={handleClearSearch}>
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <DeletePostDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          post={postToDelete}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />

        {previewPost && (
          <PostDetailModal
            post={previewPost}
            open={!!previewPost}
            onOpenChange={() => setPreviewPost(null)}
          />
        )}
      </div>
    </div>
  )
}
