import { FileText, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PostsHeaderProps {
  postsCount: number
  filteredCount: number
}

export function PostsHeader({ postsCount, filteredCount }: PostsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Quản lý Quản Lý Bài Viết
          </h1>
          <p className="text-lg text-muted-foreground">
            Quản lý và theo dõi tất cả bài viết trong hệ thống admin
          </p>
        </div>
      </div>
    </div>
  )
}
