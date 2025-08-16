"use client";

import type React from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationDropdown } from "@/components/notification-dropdown";
import { useAuth } from "@/contexts/auth-context";
import { apiService } from "@/lib/api-service";

export function SiteHeader() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Không cần chuyển hướng vì người dùng vẫn có thể xem nội dung công khai
    apiService.clearAccessToken();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-screen-2xl">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/blogs"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <BookIcon className="h-5 w-5" />
                  <span>Nền Tảng Blog</span>
                </Link>
                <Link href="/blogs" className="hover:text-foreground/80">
                  Khám Phá
                </Link>
                {isAuthenticated && (
                  <Link href="/blogs/new" className="hover:text-foreground/80">
                    Viết Bài
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    href={`/users/${user?.id}`}
                    className="hover:text-foreground/80"
                  >
                    Hồ Sơ
                  </Link>
                )}
                {user?.role === "ROLE_ADMIN" && (
                  <Link href="/admin" className="hover:text-foreground/80">
                    Quản trị
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/blogs" className="flex items-center gap-2 md:gap-3">
            <BookIcon className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-bold inline-block">ATBlog</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/blogs"
              className="font-medium transition-colors hover:text-foreground/80"
            >
              Khám Phá
            </Link>
            {isAuthenticated && (
              <Link
                href="/blogs/new"
                className="font-medium transition-colors hover:text-foreground/80"
              >
                Viết Bài
              </Link>
            )}
            {user?.role === "ROLE_ADMIN" && (
              <Link
                href="/admin"
                className="font-medium transition-colors hover:text-foreground/80"
              >
                Quản trị
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <NotificationDropdown />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          JSON.parse(
                            localStorage.getItem("authState") as string
                          ).user.avatar || "/placeholder.svg"
                        }
                        alt={user?.name}
                      />
                      <AvatarFallback>
                        {JSON.parse(localStorage.getItem("authState") as string)
                          .user?.name.substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tài Khoản Của Tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${user?.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      Hồ Sơ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/blogs/new">
                      <PenIcon className="mr-2 h-4 w-4" />
                      Viết Bài
                    </Link>
                  </DropdownMenuItem>
                  {/*<DropdownMenuItem asChild>*/}
                  {/*  <Link href="/dashboard">*/}
                  {/*    <LayoutDashboard className="mr-2 h-4 w-4" />*/}
                  {/*    Bảng Điều Khiển*/}
                  {/*  </Link>*/}
                  {/*</DropdownMenuItem>*/}
                  {/*<DropdownMenuItem asChild>*/}
                  {/*  <Link href="/settings">*/}
                  {/*    <Settings className="mr-2 h-4 w-4" />*/}
                  {/*    Cài Đặt*/}
                  {/*  </Link>*/}
                  {/*</DropdownMenuItem>*/}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng Xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button>Đăng Nhập</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// Custom icons
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function LayoutDashboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2h-.44Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LogOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
