import { Trash2, AlertTriangle } from "lucide-react"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/types/api"

interface DeletePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: BlogPost | null
  onConfirm: () => void
  isDeleting: boolean
}

export function DeletePostDialog({ 
  open, 
  onOpenChange, 
  post, 
  onConfirm, 
  isDeleting 
}: DeletePostDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span>Xác nhận xóa bài viết</span>
          </AlertDialogTitle>
          
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              {/* Post info card */}
              {post && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">
                        {post.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-2 mb-2">{post.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>Tác giả: {post.userResponse.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.viewsCount.toLocaleString()} lượt xem
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Warning message */}
              <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Cảnh báo: Thao tác không thể hoàn tác
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Bài viết sẽ bị xóa vĩnh viễn khỏi hệ thống và không thể khôi phục.
                  </p>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="gap-2 pt-4">
          <AlertDialogCancel disabled={isDeleting} className="flex-1">
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 flex-1"
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Đang xóa..." : "Xóa bài viết"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
