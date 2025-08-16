"use client";
import React from "react";
import { AuthPageWrapper } from "@/components/auth/AuthPageWrapper";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthPageWrapper
      title="Quản trị hệ thống"
      description="Sử dụng tài khoản quản trị để truy cập vào hệ thống"
      footer={null}
    >
      <LoginForm />
    </AuthPageWrapper>
  );
}
