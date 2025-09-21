import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; // Thêm thư viện decode JWT

const privatePaths = ["/me", "/dashboard", "/users", "/booking"];
const authPaths = ["/login", "/register", "/verify"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (privatePaths.some((path) => pathname.startsWith(path))) {
    // Nếu chưa đăng nhập thì redirect về login
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Nếu có token thì decode, check role
    try {
      const secret = process.env.JWT_SECRET || "your-secret"; // key JWT
      const decoded = jwt.verify(accessToken, secret) as { role?: string };
      if (decoded.role !== "ROLE_ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      // Token không hợp lệ hoặc decode lỗi
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Người đã đăng nhập không được vào trang auth nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/me",
    "/dashboard",
    "/users",
    "/login",
    "/register",
    "/verify",
    "/booking",
  ],
};
