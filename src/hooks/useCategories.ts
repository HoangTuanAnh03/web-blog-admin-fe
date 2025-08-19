import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiResponse, CategoryResponse } from "@/types/api"

const API = "https://api.sportbooking.site"

function getAccessToken(): string | null {
  try {
    return JSON.parse(localStorage.getItem("authState") as string)?.accessToken ?? null
  } catch {
    return null
  }
}

// GET CATEGORIES
async function getCategories(): Promise<ApiResponse<CategoryResponse[]>> {
  const res = await fetch(`${API}/blog/category`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  return res.json()
}

// ADD CATEGORY
async function addCategory(payload: { name: string; desc: string }): Promise<ApiResponse<CategoryResponse>> {
  console.log("Adding category with payload:", payload)
  const res = await fetch(`${API}/blog/category/create`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(payload)
  })
  
  if (!res.ok) {
    throw new Error('Failed to add category')
  }
  
  return res.json()
}

// DELETE CATEGORY
async function deleteCategory(id: number): Promise<ApiResponse<null>> {
  const res = await fetch(`${API}/blog/category/delete/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    }
  })
  
  if (!res.ok) {
    throw new Error('Failed to delete category')
  }
  
  return res.json()
}

// QUERY HOOKS với Generic Types
export function useCategoryQuery() {
  return useQuery<ApiResponse<CategoryResponse[]>, Error>({
    queryKey: ['adminCategory'],
    queryFn: getCategories,
    retry: false
  })
}

export function useAddCategory() {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<CategoryResponse>, Error, { name: string; desc: string }>({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategory'] })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<null>, Error, number>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategory'] })
    },
  })
}

// CONVENIENCE HOOK
export function useCategories() {
  const query = useCategoryQuery()
  const addMutation = useAddCategory()
  const deleteMutation = useDeleteCategory()

  return {
    categories: query.data?.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    addCategory: addMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
    addError: addMutation.error,
    deleteError: deleteMutation.error,
  }
}
