import { Trash2, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CategoryResponse } from "@/types/api"

interface CategoriesTableProps {
  categories: CategoryResponse[]
  totalCount: number
  onDelete: (category: CategoryResponse) => void
  isDeleting: boolean
}

export function CategoriesTable({ categories, totalCount, onDelete, isDeleting }: CategoriesTableProps) {
  return (
    <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Danh sách danh mục</CardTitle>
            <CardDescription className="mt-1">
              {categories.length} trong tổng số {totalCount} danh mục
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Tên danh mục</TableHead>
                <TableHead className="font-semibold">Mô tả</TableHead>
                <TableHead className="text-right font-semibold w-[120px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map(cat => (
                  <TableRow key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {cat.cname.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-semibold">{cat.cname}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-4">
                      <p className="max-w-md truncate">{cat.cdesc || "Chưa có mô tả"}</p>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(cat)}
                        disabled={isDeleting}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? "Đang xóa..." : "Xóa"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Filter className="h-8 w-8" />
                      <div>
                        <p className="font-medium">Không tìm thấy danh mục nào</p>
                        <p className="text-sm">Thử thay đổi từ khóa tìm kiếm</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
