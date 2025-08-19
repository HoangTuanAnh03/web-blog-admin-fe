"use client";

import React from "react";
import { AuthPageWrapper } from "@/components/auth/AuthPageWrapper";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthPageWrapper
      title="Tạo mới tài khoản"
      description="Nhập thông tin để tạo tài khoản quản trị mới"
      footer={null}
    >
      <SignupForm />
    </AuthPageWrapper>
  );
}
