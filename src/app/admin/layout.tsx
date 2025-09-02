"use client";

import type React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Home,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authState");
    router.push("/login");
  };

  const authState = window.localStorage.getItem("authState");
  if (!authState) {
    router.push("/login");
  }

  return (
    <div className="flex h-screen w-full flex-col">
      {" "}
      {/* h-screen để chiếm toàn màn hình */}
      <div className="flex flex-1 overflow-hidden">
        {" "}
        {/* overflow-hidden để ngăn cuộn chồng */}
        <aside className="h-full w-64 shrink-0 overflow-y-auto border-r bg-muted/40">
          <div className="flex h-14 items-center border-b px-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <LayoutDashboard className="h-6 w-6" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <nav className="grid gap-1 p-2">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === "/admin"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Home className="h-4 w-4" />
              Trang chủ
            </Link>
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === "/admin/users"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              Tài khoản
            </Link>
            <Link
              href="/admin/posts"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === "/admin/posts"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Bài viết
            </Link>
            <Link
              href="/admin/categories"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === "/admin/categories"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <PieChart className="h-4 w-4" />
              Danh mục
            </Link>
          </nav>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
