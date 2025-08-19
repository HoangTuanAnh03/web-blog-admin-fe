export interface CategoryResponse {
  id: string
  cname: string
  cdesc: string
}

export interface CategoryFormData {
  name: string
  description: string
}

export type ViewMode = "table" | "grid"
