// Định nghĩa các kiểu dữ liệu từ API
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
export interface UserResponse {
  id: string
  name: string
  avatar?: string
  email: string
  dob: string
  gender: Gender;
}

export interface PostSummaryAIResponse {
  summary: string
}

export interface CategoryResponse {
  id: number
  cname: string
  cdesc: string
}
export interface Notification {
  id: string;
  uid: string;
  message: string;
  postId: string;
  postTitle: string;
  isRead: boolean;
}
export interface PostSummaryResponse {
  id: string
  title: string
  cover: string
  excerpt: string
  userResponse: UserResponse | null
  viewsCount: number
  commentsCount: number
  hasSensitiveContent: boolean
  category: string[]
  createdAt: string // ISO string format của LocalDateTime
  coverImage?: string // Thêm trường coverImage
}

export interface ToggleFollowResponse{
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Comment {
  id: string | number
  content: string
  userResponse: UserResponse | null
  createdAt?: string
  leftValue?: number
  rightValue?: number
  replies?: Comment[]
  parentId?: string // Thêm trường parentId để hỗ trợ nested set model
  lft?: number // left value trong nested set model
  rgt?: number
}

export interface PostResponse {
  id: string
  userResponse: UserResponse | null
  title: string
  content: string
  cover: string
  viewsCount: number
  commentsCount: number
  summaryAi: string | null
  hasSensitiveContent: boolean
  rawContent: string
  comments: Comment[]
  category: string[]
  hashtags: string[]
  relatedPosts: PostSummaryResponse[]
  createdAt: string
  coverImage?: string
}

// Interface cho phân trang
export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    unpaged: boolean
    paged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}


export interface FollowStatsResponse {
  follower: UserResponse[];
  following: UserResponse[];
}
export type Gender = "MALE" | "FEMALE" | "OTHER";


export interface UserUpdateRequest{
  id: string;
  name: string;
  dob: string;
  avatar?: string;
  gender: Gender;
}