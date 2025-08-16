import { Loader2 } from "lucide-react"

// Loading spinner đơn giản
export function LoadingSpinner({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClass = {
    small: "h-4 w-4",
    default: "h-8 w-8",
    large: "h-12 w-12",
  }[size]

  return <Loader2 className={`${sizeClass} animate-spin text-primary`} />
}

// Loading state cho trang đầy đủ
export function PageLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <LoadingSpinner size="large" />
      <p className="text-muted-foreground">Đang tải dữ liệu...</p>
    </div>
  )
}

// Loading state cho section
export function SectionLoading({ text = "Đang tải..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <LoadingSpinner />
      <p className="text-muted-foreground">{text}</p>
    </div>
  )
}

// Loading skeleton cho card
export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
      <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
  )
}

// Loading skeleton cho profile
export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-muted animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-64 animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-20 bg-muted rounded animate-pulse"></div>
        <div className="h-20 bg-muted rounded animate-pulse"></div>
      </div>
    </div>
  )
}

// Loading skeleton cho blog list
export function BlogListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
