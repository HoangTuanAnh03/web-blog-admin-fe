import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

type UsersHeaderProps = {
  usersCount: number;
  filteredCount: number;
  isFetching?: boolean;
  onRefresh?: () => void;
  className?: string;
  lastUpdatedAt?: Date | string; 
};

export function UsersHeader({
  usersCount,
  filteredCount,
  isFetching = false,
  onRefresh,
  className = "",
  lastUpdatedAt,
}: UsersHeaderProps) {
  const fmt = React.useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 0,
      }),
    []
  );

  const total = Math.max(0, usersCount || 0);
  const visible = Math.min(filteredCount || 0, total);

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Quản lý Tài khoản
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Tổng số</span>
            <Badge variant="secondary" className="px-2 py-0.5">
              {fmt.format(total)} người dùng
            </Badge>

            <Separator orientation="vertical" className="h-4" />

            <span className="text-muted-foreground">Đang hiển thị</span>
            <Badge className="px-2 py-0.5">
              {fmt.format(visible)} / {fmt.format(total)}
            </Badge>
          </div>

          {lastUpdatedAt && (
            <p className="text-xs text-muted-foreground mt-2">
              Cập nhật lần cuối:{" "}
              {new Date(lastUpdatedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isFetching}
              className="gap-2"
            >
              <RotateCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Đang tải..." : "Làm mới"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
