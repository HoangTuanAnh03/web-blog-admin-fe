import { Search } from "lucide-react"

export function CategoriesLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-lg font-medium text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    </div>
  )
}

export function CategoriesError() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-900">Không tải được dữ liệu</h3>
          <p className="text-red-600">Vui lòng thử lại sau</p>
        </div>
      </div>
    </div>
  )
}
