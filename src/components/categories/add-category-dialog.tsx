import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CategoryFormData } from "@/types/category"

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CategoryFormData) => void
  isAdding: boolean
}

export function AddCategoryDialog({ open, onOpenChange, onSubmit, isAdding }: AddCategoryDialogProps) {
  const [formData, setFormData] = useState<CategoryFormData>({ name: "", description: "" })

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData({ name: "", description: "" })
  }

  const handleCancel = () => {
    onOpenChange(false)
    setFormData({ name: "", description: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Thêm danh mục mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin danh mục và bấm Thêm mới để hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Tên danh mục *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ví dụ: Công nghệ, Du lịch..."
              className="h-11"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mô tả ngắn gọn về danh mục này..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isAdding}>
            Hủy bỏ
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name.trim() || isAdding}>
            {isAdding ? "Đang thêm..." : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
