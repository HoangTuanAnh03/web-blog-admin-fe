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
  const categories: string[] = Array.isArray(post.category)
    ? post.category.filter(Boolean)
    : post.category
      ? [post.category]
      : [];

  // Ngày tạo & lượt xem (fallback gọn gàng)
  const createdAtText = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "—";

  const viewsText = new Intl.NumberFormat("vi-VN").format(Math.max(0, Number(post.viewsCount) || 0));
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Author */}
              <div className="group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
                <div className="absolute inset-px pointer-events-none rounded-[11px] opacity-[.85]" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full grid place-items-center bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-foreground/60">Tác giả</p>
                    <p className="font-medium truncate" title={post?.userResponse?.name || "—"}>
                      {post?.userResponse?.name || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full grid place-items-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-foreground/60">Danh mục</p>
                    {categories.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {categories.slice(0, 6).map((c) => (
                          <span key={c} className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium bg-background">
                            {c}
                          </span>
                        ))}
                        {categories.length > 6 && (
                          <span
                            className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] text-foreground/70 bg-muted"
                            title={categories.slice(2).join(", ")}
                          >
                            +{categories.length - 6}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full grid place-items-center bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-foreground/60">Ngày tạo</p>
                    <p className="font-medium">{createdAtText}</p>
                  </div>
                </div>
              </div>

              {/* Views */}
              <div className="group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full grid place-items-center bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-foreground/60">Lượt xem</p>
                    <p className="font-medium tabular-nums">{viewsText}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />
          </div>


          {/* Image Gallery từ content */}
          {/* {contentImages.length > 0 && (
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
          )} */}

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
