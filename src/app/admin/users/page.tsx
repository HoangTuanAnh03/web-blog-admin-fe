"use client";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUserQuery, lockUser } from "@/hooks/useAdminQuery";
import { User } from "@/types/api";
import { UsersHeader } from "@/components/users/UsersHeader";
import { UsersFilter } from "@/components/users/UsersFilter";
import { UsersTable } from "@/components/users/UsersTable";
import { LockUserDialog } from "@/components/users/LockUserDialog";



export default function UsersPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
  const [userToLock, setUserToLock] = useState<User | null>(null);

  const { data, isLoading, isFetching, error, refetch } = useUserQuery({ page: currentPage });

  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error, router]);

  const users = data?.data.content ?? [];
  const totalElements = data?.data.totalElements ?? 0;
  const pageSize = data?.data.pageable?.pageSize ?? 12;
  const totalPages = Math.ceil(totalElements / pageSize);

  const handleOpenLockDialog = useCallback((user: User) => {
    setUserToLock(user);
    setLockDialogOpen(true);
  }, []);

  const handleCloseLockDialog = useCallback(() => {
    setLockDialogOpen(false);
    setUserToLock(null);
  }, []);

  const confirmLock = useCallback(async () => {
    if (!userToLock) return;
    setLockDialogOpen(false);
    const response = await lockUser(userToLock.id, userToLock.is_locked);
    if (response) {
      toast({
        title: `${userToLock.is_locked ? "Mở khóa" : "Khóa"} người dùng thành công`,
        duration: 1500,
      });
      refetch();
    } else {
      toast({
        title: `${userToLock.is_locked ? "Mở khóa" : "Khóa"} người dùng thất bại`,
        variant: "destructive",
        duration: 1500,
      });
    }
    setUserToLock(null);
  }, [userToLock, toast, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl space-y-8">
        <UsersHeader usersCount={totalElements} filteredCount={users.length} />
        <UsersFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <UsersTable
          users={users}
          totalCount={totalElements}
          isLoading={isLoading}
          isFetching={isFetching}
          searchTerm={searchTerm}
          onLockClick={handleOpenLockDialog}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <LockUserDialog
          open={lockDialogOpen}
          onOpenChange={setLockDialogOpen}
          user={userToLock}
          onConfirm={confirmLock}
          onCancel={handleCloseLockDialog}
        />
      </div>
    </div>
  );
}
