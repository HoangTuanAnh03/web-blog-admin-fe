"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/auth/FormField";
import { PasswordField } from "@/components/auth/PasswordField";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const emailRegex = useMemo(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, []);
  const passwordRegex = useMemo(() => /^[A-Za-z0-9]{8,}$/, []);

  const validateEmail = (v: string) => setEmailError(emailRegex.test(v) ? "" : "Email không hợp lệ");
  const validatePassword = (v: string) => setPasswordError(passwordRegex.test(v.trim()) ? "" : "Mật khẩu tối thiểu 8 ký tự, chỉ chữ/số");

  const isFormInvalid = !email || !password || !!emailError || !!passwordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({ title: "Lỗi", description: "Vui lòng nhập đầy đủ thông tin đăng nhập", variant: "destructive", duration: 1500 });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({ title: "Đăng nhập thành công", description: "Chào mừng bạn quay trở lại!", duration: 1500 });
        // await apiService.reloadAccessToken?.();
        router.push("/admin");
        router.refresh();    
      } else {
        toast({ title: "Đăng nhập thất bại", description: "Email hoặc mật khẩu không chính xác", variant: "destructive", duration: 1500 });
      }
    } catch {
      toast({ title: "Đăng nhập thất bại", description: "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.", variant: "destructive", duration: 1500 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="name@example.com"
          onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
          onBlur={(e) => validateEmail(e.target.value)}
          required
          disabled={isLoading}
          error={emailError}
        />

        <PasswordField
          value={password}
          onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }}
          onBlur={(e) => validatePassword(e.target.value)}
          required
          disabled={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={passwordError}
        />

        {/* <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Quên mật khẩu?
        </Link>
      </div> */}

        <Button type="submit" disabled={isLoading || isFormInvalid}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Chưa có tài khoản?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </form>
  );
}
