"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Home, LayoutDashboard, LogOut, PieChart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authState");
    router.push("/login");
  };

  const authState = typeof window !== "undefined" ? window.localStorage.getItem("authState") : null;
  if (!authState) {
    router.push("/login");
  }

  return (
    <div className="w-full">
      <div className="">
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r bg-muted/40 flex flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/admin" className="flex items-center gap-2 font-semibold truncate">
              <LayoutDashboard className="h-6 w-6 shrink-0" />
              <span className="truncate">Admin Dashboard</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary truncate",
                pathname === "/admin" ? "bg-muted text-primary" : "text-muted-foreground"
              )}
            >
              <Home className="h-4 w-4 shrink-0" /> <span className="truncate">Trang chủ</span>
            </Link>
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary truncate",
                pathname === "/admin/users" ? "bg-muted text-primary" : "text-muted-foreground"
              )}
            >
              <Users className="h-4 w-4 shrink-0" /> <span className="truncate">Tài khoản</span>
            </Link>
            <Link
              href="/admin/posts"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary truncate",
                pathname === "/admin/posts" ? "bg-muted text-primary" : "text-muted-foreground"
              )}
            >
              <BarChart3 className="h-4 w-4 shrink-0" /> <span className="truncate">Bài viết</span>
            </Link>
            <Link
              href="/admin/categories"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary truncate",
                pathname === "/admin/categories" ? "bg-muted text-primary" : "text-muted-foreground"
              )}
            >
              <PieChart className="h-4 w-4 shrink-0" /> <span className="truncate">Danh mục</span>
            </Link>
          </nav>

          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start gap-2 truncate" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> <span className="truncate">Đăng xuất</span>
            </Button>
          </div>
        </aside>

        <main className="ml-64 h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
