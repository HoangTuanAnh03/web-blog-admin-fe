import {
  ApiResponse,
  CategoryResponse,
  FollowStatsResponse,
  Notification,
  PageResponse,
  PostResponse,
  PostSummaryAIResponse,
  PostSummaryResponse,
  ToggleFollowResponse,
  UserResponse,
  UserUpdateRequest,
} from "@/types/api";

class ApiService {
  private static instance: ApiService | undefined;
  private baseUrl = "https://api.sportbooking.site";
  private accessToken = "";
  private constructor() {
    this.loadAccessToken();
  }

  private loadAccessToken() {
    if (typeof window === "undefined") {
      return;
    }
    this.accessToken =
      JSON.parse(<string>window.localStorage.getItem("authState"))
        ?.accessToken || "";
  }

  public reloadAccessToken() {
    this.loadAccessToken();
  }

  public clearAccessToken() {
    this.accessToken = "";
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          // 'X-Auth-User-Id': '123-123-123'
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getUserFollowStats(userId: string) {
    return this.fetchApi<ApiResponse<FollowStatsResponse>>(
      `/blog/follow/${userId}`
    );
  }

  async getUserBlogs(userId: string, page = 0, size = 10) {
    return this.fetchApi<ApiResponse<PageResponse<PostSummaryResponse>>>(
      `/blog/post/user/${userId}?page=${page}`
    );
  }

  async checkFollowStatus(userId: string, pid: string) {
    if (pid != "") {
      return this.fetchApi<ApiResponse<boolean>>(
        `/blog/follow/isFollow?pid=${pid}`
      );
    }
    return this.fetchApi<ApiResponse<boolean>>(
      `/blog/follow/isFollow?userId=${userId}`
    );
  }

  async toggleFollow(userId: string, isFollowing: boolean) {
    return this.fetchApi<ApiResponse<ToggleFollowResponse>>(
      `/blog/follow/${userId}`,
      {
        method: "POST",
      }
    );
  }

  async getBlogSummary(postId: string) {
    return this.fetchApi<PostSummaryAIResponse>(
      `/blog/post/summary?pid=${postId}`
    );
  }

  async postBlog(
    title: string,
    content: string,
    cids: number[],
    hashtags: string[],
    cover: string | null
  ) {
    return this.fetchApi<ApiResponse<PostSummaryAIResponse>>(`/blog/post`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        cids: cids,
        hashtags: hashtags,
        cover: cover,
      }),
    });
  }

  async getBlogList(page = 0, size = 10, filters?: any) {
    let url = `/blog/post?page=${page}`;

    if (filters) {
      if (filters.query) {
        url += `&search=${encodeURIComponent(filters.query)}`;
      }
      if (filters.topics && filters.topics.length > 0) {
        url += `&categories=${encodeURIComponent(filters.topics.join(","))}`;
      }
    }

    return this.fetchApi<ApiResponse<PageResponse<PostSummaryResponse>>>(url);
  }

  async getTopics() {
    return this.fetchApi<{
      code: number;
      message: string;
      data: CategoryResponse[];
    }>(`/blog/category`);
  }

  async getBlogDetail(id: string) {
    return this.fetchApi<PostResponse>(`/blog/post/${id}`);
  }

  async fetchNotifications() {
    return this.fetchApi<ApiResponse<Notification[]>>(`/blog/notification`);
  }

  async updateUser(user: UserUpdateRequest) {
    return this.fetchApi<ApiResponse<UserResponse>>(`/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: user.name,
        dob: user.dob,
        gender: user.gender,
        avatar: user.avatar ?? "",
      }),
    });
  }

  async getUserById(uid: string) {
    return this.fetchApi<ApiResponse<UserResponse>>(
      `/users/fetchUserById/${uid}`
    );
  }

  async getMyInf() {
    return this.fetchApi<ApiResponse<UserUpdateRequest>>(`/users/my-info`);
  }
}

export const apiService = ApiService.getInstance();
