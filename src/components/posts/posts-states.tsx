import { Loader2, AlertCircle, FileText, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PostsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Đang tải bài viết...</h3>
              <p className="text-muted-foreground text-center text-sm">
                Vui lòng chờ trong giây lát, chúng tôi đang tải dữ liệu
              </p>
              
              {/* Loading skeleton */}
              <div className="w-full mt-6 space-y-2">
                <div className="h-2 bg-muted rounded animate-pulse" />
                <div className="h-2 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-2 bg-muted rounded animate-pulse w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function PostsError() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md border-red-200 dark:border-red-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lỗi tải dữ liệu</h3>
              <p className="text-muted-foreground text-center mb-6 text-sm">
                Không thể tải danh sách bài viết. Có thể do lỗi kết nối mạng hoặc server tạm thời không khả dụng.
              </p>
              
              <div className="flex gap-2 w-full">
                <Button onClick={handleRefresh} className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Tải lại
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <FileText className="h-4 w-4" />
                  Báo lỗi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
