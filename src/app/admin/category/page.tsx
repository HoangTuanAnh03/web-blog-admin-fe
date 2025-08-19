"use client"

import React, { useMemo, useState } from "react"
import { useCategories } from "@/hooks/useCategories"
import { CategoryResponse } from "@/types/api"
import { CategoryFormData, ViewMode } from "@/types/category"
import { toast } from "@/hooks/use-toast"

import { CategoriesHeader } from "@/components/categories/categories-header"
import { CategoriesFilter } from "@/components/categories/categories-filter"
import { CategoriesTable } from "@/components/categories/categories-table"
import { CategoriesGrid } from "@/components/categories/categories-grid"
import { AddCategoryDialog } from "@/components/categories/add-category-dialog"
import { DeleteCategoryDialog } from "@/components/categories/delete-category-dialog"
import { CategoriesLoading, CategoriesError } from "@/components/categories/categories-states"

export default function CategoriesPage() {
  const { categories, isLoading, error, addCategory, deleteCategory, isAdding, isDeleting } = useCategories()

  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryResponse | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const filteredCategories = useMemo(
    () => categories.filter(
      (cat) =>
        (cat.cname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.cdesc || "").toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [categories, searchTerm]
  )

  const handleAddCategory = (data: CategoryFormData) => {
    addCategory(
      { name: data.name, desc: data.description },
      {
        onSuccess: () => {
          setAddDialogOpen(false)
          toast({
            title: "Thành công",
            description: "Đã thêm danh mục mới!",
            variant: "default",
          })
        },
        onError: () => {
          toast({
            title: "Lỗi",
            description: "Thêm danh mục thất bại!",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleDeleteCategory = (cat: CategoryResponse) => {
    setCategoryToDelete(cat)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false)
          setCategoryToDelete(null)
          toast({
            title: "Đã xóa!",
            description: `Danh mục "${categoryToDelete.cname}" đã được xóa.`,
            variant: "default",
          })
        },
        onError: () => {
          toast({
            title: "Lỗi",
            description: "Không thể xóa danh mục này.",
            variant: "destructive",
          })
        },
      })
    }
  }

  if (isLoading) return <CategoriesLoading />
  if (error) return <CategoriesError />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <CategoriesHeader 
          categoriesCount={categories.length}
          onAddClick={() => setAddDialogOpen(true)}
          isAdding={isAdding}
        />

        <CategoriesFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === "table" ? (
          <CategoriesTable
            categories={filteredCategories}
            totalCount={categories.length}
            onDelete={handleDeleteCategory}
            isDeleting={isDeleting}
          />
        ) : (
          <CategoriesGrid
            categories={filteredCategories}
            onDelete={handleDeleteCategory}
            isDeleting={isDeleting}
          />
        )}

        <AddCategoryDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSubmit={handleAddCategory}
          isAdding={isAdding}
        />

        <DeleteCategoryDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          category={categoryToDelete}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  )
}
