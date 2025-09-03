import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CategoriesHeaderProps {
  categoriesCount: number
  onAddClick: () => void
  isAdding: boolean
}

export function CategoriesHeader({ categoriesCount, onAddClick, isAdding }: CategoriesHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Quản lý danh mục
          </h1>
          <p className="text-lg text-muted-foreground">
            Quản lý các danh mục bài viết được sử dụng
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {categoriesCount} danh mục
          </Badge>
          
          <Button 
            size="default" 
            className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" 
            disabled={isAdding}
            onClick={onAddClick}
          >
            <Plus className="h-4 w-4" />
            Thêm danh mục
          </Button>
        </div>
      </div>
    </div>
  )
}
