import { Trash2, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryResponse } from "@/types/api"

interface CategoriesGridProps {
  categories: CategoryResponse[]
  onDelete: (category: CategoryResponse) => void
  isDeleting: boolean
}

export function CategoriesGrid({ categories, onDelete, isDeleting }: CategoriesGridProps) {
  if (categories.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Filter className="h-16 w-16 mb-4" />
        <h3 className="text-lg font-medium mb-2">Không tìm thấy danh mục nào</h3>
        <p className="text-center">Thử thay đổi từ khóa tìm kiếm hoặc thêm danh mục mới</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map(cat => (
        <Card key={cat.id} className="group hover:shadow-lg transition-all duration-200 border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {cat.cname.charAt(0).toUpperCase()}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(cat)}
                disabled={isDeleting}
                className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{cat.cname}</h3>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {cat.cdesc || "Chưa có mô tả cho danh mục này"}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
