import React from "react"
import { Eye, Trash2, Filter, Calendar, User, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/types/api"

interface PostsGridProps {
  posts: BlogPost[]
  onDelete: (post: BlogPost) => void
  onView: (post: BlogPost) => void
  isDeleting: boolean
}

export function PostsGrid({ posts, onDelete, onView, isDeleting }: PostsGridProps) {
  // const getStatusBadge = (sensitive: boolean) => {
  //   return sensitive ? (
  //     <Badge variant="destructive" className="text-xs gap-1">
  //       <MessageSquare className="h-3 w-3" />
  //       Nhạy cảm
  //     </Badge>
  //   ) : (
  //     <Badge variant="secondary" className="text-xs gap-1">
  //       <MessageSquare className="h-3 w-3" />
  //       Bình thường
  //     </Badge>
  //   )
  // }

  if (posts.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Filter className="h-16 w-16 mb-4" />
        <h3 className="text-lg font-medium mb-2">Không tìm thấy bài viết nào</h3>
        <p className="text-center">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài viết phù hợp</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map(post => (
        <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            {/* Header với avatar và actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-lg">
                    {post.title.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-1">{post.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <User className="h-3 w-3" />
                    <span className="truncate">{post.userResponse.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content preview */}
            <div className="mb-4">
              <div 
                className="text-muted-foreground text-sm line-clamp-3 mb-3"
                dangerouslySetInnerHTML={{ 
                  __html: post.content?.replace(/<[^>]*>/g, '') || "Không có nội dung preview" 
                }}
              />
            </div>

            {/* Metadata */}
            <div className="space-y-3 mb-4">
              {/* <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                {getStatusBadge(post.hasSensitiveContent)}
              </div> */}
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : "—"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.viewsCount.toLocaleString()} lượt xem</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(post)}
                className="flex-1 gap-1 h-8"
              >
                <Eye className="h-3 w-3" />
                Xem
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(post)}
                disabled={isDeleting}
                className="flex-1 gap-1 h-8"
              >
                <Trash2 className="h-3 w-3" />
                {isDeleting ? "Xóa..." : "Xóa"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
