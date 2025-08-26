import { Calendar, User, Eye, Tag, ImageIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BlogPost } from "@/types/api"
import Image from "next/image"

interface PostDetailModalProps {
  post: BlogPost | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostDetailModal({ post, open, onOpenChange }: PostDetailModalProps) {
  if (!post) return null

  // Extract images từ content HTML
  const extractImagesFromContent = (htmlContent: string) => {
    if (!htmlContent) return []
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')
      const images = doc.querySelectorAll('img')
      return Array.from(images).map(img => ({
        src: img.src,
        alt: img.alt || 'Blog image',
        title: img.title || ''
      }))
    } catch (error) {
      return []
    }
  }

  const contentImages = extractImagesFromContent(post.content)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[95vh] flex flex-col p-0 overflow-hidden">
        {/* Header Section - Fixed */}
        <DialogHeader className="p-6 pb-0 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl font-bold line-clamp-3 mb-3 leading-tight">
                {post.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Chi tiết bài viết và nội dung đầy đủ
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Featured Image Section */}
          {post.cover && (
            <div className="px-6 flex-shrink-0 mb-4">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-muted border">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium opacity-90">Ảnh đại diện</p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata Section */}
          <div className="px-6 flex-shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {/* Author Card */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">Tác giả</p>
                  <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm truncate">
                    {post.userResponse.name}
                  </p>
                </div>
              </div>

              {/* Category Card */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border border-green-200 dark:border-green-800">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Tag className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-green-800 dark:text-green-200 mb-1">Danh mục</p>
                  <Badge variant="outline" className="text-xs font-semibold text-green-900 dark:text-green-100 border-green-300">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Date Card */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-1">Ngày tạo</p>
                  <p className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                    {post.createdAt 
                      ? new Date(post.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })
                      : "—"
                    }
                  </p>
                </div>
              </div>

              {/* Views Card */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-1">Lượt xem</p>
                  <p className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
                    {post.viewsCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />
          </div>

          {/* Image Gallery từ content */}
          {contentImages.length > 0 && (
            <div className="px-6 flex-shrink-0 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Hình ảnh trong bài viết ({contentImages.length})</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {contentImages.slice(0, 8).map((img, index) => (
                  <div key={index} className="group relative aspect-video rounded-lg overflow-hidden bg-muted border hover:shadow-lg transition-all duration-300">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.src = '/placeholder-image.jpg'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
                
                {contentImages.length > 8 && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:bg-muted transition-colors">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium text-muted-foreground">
                        +{contentImages.length - 8} ảnh khác
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Xem trong nội dung
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="px-6 pb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Nội dung bài viết</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                {contentImages.length > 0 && (
                  <span className="flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    {contentImages.length} ảnh
                  </span>
                )}
              </div>
            </div>
            
            <div className="rounded-lg border border-border bg-card/50">
              <div className="p-6">
                <article 
                  className="prose prose-sm max-w-none dark:prose-invert 
                             prose-headings:text-foreground prose-p:text-foreground/90
                             prose-strong:text-foreground prose-a:text-primary
                             prose-blockquote:text-muted-foreground prose-blockquote:border-border
                             prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
                             prose-pre:bg-muted prose-pre:border prose-pre:border-border
                             prose-img:rounded-lg prose-img:shadow-sm prose-img:border prose-img:border-border prose-img:max-w-full prose-img:h-auto
                             prose-hr:border-border prose-table:border prose-table:border-border
                             prose-th:border prose-th:border-border prose-td:border prose-td:border-border"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content || `
                      <div class="text-center py-8 text-muted-foreground">
                        <p class="text-lg mb-2">📝 Không có nội dung</p>
                        <p class="text-sm">Bài viết này chưa có nội dung hoặc đang được cập nhật.</p>
                      </div>
                    ` 
                  }}
                />
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
              <span>ID: {post.id}</span>
              <span>
                Cập nhật: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
