
import { useQuery } from '@tanstack/react-query'
import {ApiResponse, BlogPost, CategoryResponse, DashboardResponse, Page, UserListResponse, PageResponse} from "@/types/api";

const API = "https://api.sportbooking.site"

// 🔥 THAY ĐỔI: Loại bỏ size vì backend mặc định là 12
interface PostFilters {
  page?: number
  search?: string  // Chỉ có page và search
}

// 🔥 THAY ĐỔI: Simplified getPost function
async function getPost(filters: PostFilters = {}): Promise<ApiResponse<PageResponse<BlogPost>>> {
    const { page = 0, search } = filters;

    // Build query parameters - chỉ page và search
    const params = new URLSearchParams({
        page: page.toString(),
    });

    // Add search parameter if provided
    if (search && search.trim()) {
        params.append('search', search.trim());
    }

    const res = await fetch(`${API}/blog/post?${params}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

// Các functions khác giữ nguyên...
async function fetchDashboard(): Promise<ApiResponse<DashboardResponse>> {
    const res = await fetch(`${API}/blog/admin/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch dashboard')
    }

    return res.json()
}

async function getCategories(): Promise<ApiResponse<CategoryResponse[]>> {
    const res = await fetch(`${API}/blog/admin/category`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch categories')
    }

    return res.json()
}

async function getUsers(): Promise<ApiResponse<UserListResponse>> {
    const res = await fetch(`${API}/users/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }

    return res.json()
}

export async function deletePost(pid: string): Promise<boolean> {
    const res = await fetch(`${API}/blog/post/delete/${pid}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })
    return res.ok;
}

export async function lockUser(uid: string, isLock: boolean): Promise<boolean> {
    const res = await fetch(`${API}/users/lock/${uid}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
        body: JSON.stringify({lock: !isLock}),
    })
    return res.ok;
}

// React Query hooks
export function useDashboardQuery() {
    return useQuery({
        queryKey: ['adminDashboard'],
        queryFn: fetchDashboard,
        retry: false
    })
}

export function useCategoryQuery() {
    return useQuery({
        queryKey: ['adminCategory'],
        queryFn: getCategories,
        retry: false
    })
}

export function usePostQuery(filters: PostFilters = {}) {
    return useQuery({
        queryKey: ['adminPost', filters],
        queryFn: () => getPost(filters),
        retry: false,
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5,
    })
}

export function useUserQuery() {
    return useQuery({
        queryKey: ['adminUser'],
        queryFn: getUsers,
        retry: false
    })
}

export type { PostFilters };
