// UsersHeader.tsx
import React from "react";

interface UsersHeaderProps {
  usersCount: number;
  filteredCount: number;
}

export function UsersHeader({ usersCount, filteredCount }: UsersHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Quản lý Tài khoản
          </h1>
          <p className="text-lg ">
            Tổng số: {usersCount} người dùng
          </p>
          <p className=" text-muted-foreground">Đang hiện thị: {filteredCount} người dùng</p>
        </div>
      </div>
    </div>
  );
}
