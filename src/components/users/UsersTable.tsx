import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Filter } from "lucide-react";
import { User } from "@/types/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UsersTableProps {
  users: User[];
  totalCount: number;
  isLoading: boolean;
  isFetching: boolean;
  searchTerm: string;
  onLockClick: (user: User) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UsersTable({
  users,
  totalCount,
  isLoading,
  isFetching,
  searchTerm,
  onLockClick,
  currentPage,
  totalPages,
  onPageChange,
}: UsersTableProps) {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Danh sách người dùng</CardTitle>
            <CardDescription className="mt-1">
              {filteredUsers.length} trong tổng số {totalCount} người dùng
              {searchTerm ? ` (lọc theo: "${searchTerm}")` : ""}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Tên</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Giới tính</TableHead>
                <TableHead className="font-semibold">Ngày sinh</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="text-right font-semibold w-[140px]">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 rounded-lg">
                          <AvatarImage src={user.avatar ?? ""} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">{user.email}</TableCell>
                    <TableCell className="py-4">{user.gender}</TableCell>
                    <TableCell className="py-4">{user.dob}</TableCell>

                    <TableCell className="py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          !user.is_locked
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.is_locked ? "Đã khóa" : "Hoạt động"}
                      </span>
                    </TableCell>

                    <TableCell className="text-right py-4">
                      <Button
                        variant={user.is_locked ? "outline" : "destructive"}
                        size="sm"
                        onClick={() => onLockClick(user)}
                        className="gap-2"
                      >
                        {user.is_locked ? (
                          <>
                            <Unlock className="mr-2 h-4 w-4" /> Mở khóa
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" /> Khóa
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Filter className="h-8 w-8" />
                      <div>
                        <p className="font-medium">Không tìm thấy người dùng</p>
                        <p className="text-sm">Thử thay đổi từ khóa tìm kiếm</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 0}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Trang trước
            </Button>

            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                variant={currentPage === idx ? "default" : "ghost"}
                onClick={() => onPageChange(idx)}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages - 1}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Trang sau
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
