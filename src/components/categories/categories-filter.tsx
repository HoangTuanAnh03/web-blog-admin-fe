import { Search, List, Grid3X3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ViewMode } from "@/types/category"

interface CategoriesFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function CategoriesFilter({ 
  searchTerm, 
  onSearchChange, 
  viewMode, 
  onViewModeChange 
}: CategoriesFilterProps) {
  return (
    <Card className="mb-6 shadow-sm border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên hoặc mô tả..."
              className="pl-10 h-11 bg-background"
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg p-1 bg-background">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("table")}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
