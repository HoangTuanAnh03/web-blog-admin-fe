"use client";

import type React from "react";
import Link from "next/link";
import { Menu, User, LogOut, PenSquare } from "lucide-react";
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

export function SiteHeader() {
  const isAuthenticated =
    typeof window !== "undefined" && !!localStorage.getItem("authState");

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("authState");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-accent/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Link
                  href="/"
                  className="flex items-center gap-3 text-xl font-bold text-primary"
                >
                  <BookIcon className="h-6 w-6" />
                  <span>ATBlog</span>
                </Link>
                <Link
                  href="/blogs"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Khám Phá
                </Link>
                <Link
                  href="/blogs/new"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Viết Bài
                </Link>
                <Link
                  href="/profile"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Hồ Sơ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-3 group">
            <BookIcon className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-200" />
            <span className="font-black text-xl text-foreground group-hover:text-primary transition-colors duration-200">
              ATBlog
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium ml-8">
            <Link
              href="/blogs"
              className="text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              Khám Phá
            </Link>
            <Link
              href="/blogs/new"
              className="text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              Viết Bài
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent/10"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      AT
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-semibold">
                  Tài Khoản Của Tôi
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-3 h-4 w-4" />
                    Hồ Sơ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blogs/new" className="cursor-pointer">
                    <PenSquare className="mr-3 h-4 w-4" />
                    Viết Bài
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Đăng Xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hover:bg-accent/10 font-medium"
                >
                  Đăng Nhập
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm">
                  Đăng Ký
                </Button>
              </Link>
            </div>
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
