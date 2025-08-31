"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("AdminRoute - isAuthenticated:", isAuthenticated);
    console.log("AdminRoute - user:", user);

    if (!isAuthenticated) {
      toast({
        title: "Vui lòng đăng nhập để truy cập trang quản trị",
        variant: "destructive",
      });
      router.replace("/login");
    } else if (user?.role !== "ROLE_ADMIN") {
      toast({
        title: "Bạn không có quyền truy cập trang này",
        variant: "destructive",
      });
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null; 
  }

  return <>{children}</>;
}
