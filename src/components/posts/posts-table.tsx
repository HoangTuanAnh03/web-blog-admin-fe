import {
  Eye,
  Trash2,
  Filter,
  Calendar,
  User,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/api";

interface PostsTableProps {
  posts: BlogPost[];
  totalCount: number;
  onDelete: (post: BlogPost) => void;
  onView: (post: BlogPost) => void;
  isDeleting: boolean;
}

export function PostsTable({
  posts,
  totalCount,
  onDelete,
  onView,
  isDeleting,
}: PostsTableProps) {
  const getStatusBadge = (sensitive: boolean) => {
    return sensitive ? (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Nhạy cảm
      </Badge>
    ) : (
      <Badge variant="secondary" className="gap-1">
        <CheckCircle className="h-3 w-3" />
        An toàn
      </Badge>
    );
  };

  // 🔥 MỚI: Function để render multiple categories
  const renderCategories = (categories: string | string[]) => {
    // Handle both string and array format
    const categoryList = Array.isArray(categories) ? categories : [categories];

    // Filter out empty/invalid categories
    const validCategories = categoryList.filter(
      (cat) => cat && typeof cat === "string" && cat.trim() !== ""
    );

    if (validCategories.length === 0) {
      return (
        <Badge variant="outline" className="text-xs">
          Chưa phân loại
        </Badge>
      );
    }

    if (validCategories.length === 1) {
      return (
        <Badge variant="outline" className="text-xs">
          {validCategories[0]}
        </Badge>
      );
    }

    if (validCategories.length <= 2) {
      return (
        <div className="flex flex-col gap-1">
          {validCategories.map((cat, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
      );
    }

    // If more than 2 categories, show first one + count
    return (
      <div className="flex flex-col gap-1">
        <Badge variant="outline" className="text-xs">
          {validCategories[0]}
        </Badge>
        <Badge variant="secondary" className="text-xs gap-1">
          <Plus className="h-2 w-2" />
          {validCategories.length - 1} khác
        </Badge>
      </div>
    );
  };

  return (
    <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Danh sách bài viết</CardTitle>
            <CardDescription className="mt-1">
              Hiển thị {posts.length} trong tổng số{" "}
              {totalCount.toLocaleString()} bài viết
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold text-left w-[35%]">
                  Tiêu đề
                </TableHead>
                <TableHead className="font-semibold text-center w-[15%]">
                  Danh mục
                </TableHead>
                <TableHead className="font-semibold text-center w-[12%]">
                  Tác giả
                </TableHead>
                <TableHead className="font-semibold text-center w-[12%]">
                  Trạng thái
                </TableHead>
                <TableHead className="font-semibold text-center w-[10%]">
                  Ngày tạo
                </TableHead>
                <TableHead className="font-semibold text-center w-[8%]">
                  Lượt xem
                </TableHead>
                <TableHead className="font-semibold text-center w-[8%]">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {/* Tiêu đề */}
                    <TableCell className="py-4 w-[35%]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary font-bold text-sm">
                            {post.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1 leading-5">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            ID: {post.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 w-[15%] text-center">
                      <div className="flex justify-center">
                        <div className="max-w-full">
                          {renderCategories(post.category)}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 w-[12%] text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-sm text-center line-clamp-1">
                          {post.userResponse.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 w-[12%] text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(post.hasSensitiveContent)}
                      </div>
                    </TableCell>

                    <TableCell className="py-4 w-[12%] text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                }
                              )
                            : "—"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 w-[8%] text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          {post.viewsCount > 1000
                            ? `${(post.viewsCount / 1000).toFixed(1)}K`
                            : post.viewsCount.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 w-[8%] text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(post)}
                          className="h-8 w-8 p-0"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(post)}
                          disabled={isDeleting}
                          className="h-8 w-8 p-0"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    {" "}
                    {/* 🔥 Thay đổi colSpan từ 7 thành 6 */}
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Filter className="h-12 w-12 opacity-50" />
                      <div className="text-center">
                        <p className="font-medium text-lg mb-2">
                          Không tìm thấy bài viết nào
                        </p>
                        <p className="text-sm">
                          Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                        </p>
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
  );
}
