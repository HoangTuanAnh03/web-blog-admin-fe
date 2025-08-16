"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, RegisterData } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/auth/FormField";
import { PasswordField } from "@/components/auth/PasswordField";

export function SignupForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<RegisterData["gender"]>("MALE");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = useMemo(
    () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    []
  );
  const passwordRegex = useMemo(() => /^[A-Za-z0-9]{8,}$/, []);

  const validateName = (v: string) =>
    setNameError(
      v.trim().length === 0 ? "Tên không được để toàn khoảng trắng" : ""
    );
  const validateEmail = (v: string) =>
    setEmailError(
      emailRegex.test(v)
        ? ""
        : "Email phải đúng định dạng (ví dụ: user@example.com)"
    );
  const validatePassword = (v: string) =>
    setPasswordError(
      passwordRegex.test(v.trim())
        ? ""
        : "Mật khẩu tối thiểu 8 ký tự, chỉ gồm chữ/số"
    );

  const isFormInvalid =
    !name ||
    !email ||
    !password ||
    !dob ||
    !gender ||
    !!nameError ||
    !!emailError ||
    !!passwordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    if (isFormInvalid) {
      toast({
        title: "Lỗi",
        description: "Vui lòng kiểm tra và sửa thông tin không hợp lệ",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    setIsLoading(true);
    const userData: RegisterData = {
      name: name.trim(),
      email,
      password: password.trim(),
      dob,
      gender,
    };

    try {
      const success = await register(userData);
      if (success) {
        toast({
          title: "Đăng ký thành công",
          description: "Vui lòng kiểm tra email để xác thực tài khoản!",
          duration: 1500,
        });
        router.push("/login");
      } else {
        toast({
          title: "Đăng ký thất bại",
          description: "Thông tin không hợp lệ hoặc email đã tồn tại",
          variant: "destructive",
          duration: 1500,
        });
      }
    } catch {
      toast({
        title: "Đăng ký thất bại",
        description: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.",
        variant: "destructive",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormField
        id="name"
        label="Tên"
        value={name}
        placeholder="John Doe"
        onChange={(e) => {
          setName(e.target.value);
          validateName(e.target.value);
        }}
        onBlur={(e) => validateName(e.target.value)}
        required
        disabled={isLoading}
        error={nameError}
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        placeholder="name@example.com"
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        onBlur={(e) => validateEmail(e.target.value)}
        required
        disabled={isLoading}
        error={emailError}
      />

      <PasswordField
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        onBlur={(e) => validatePassword(e.target.value)}
        required
        disabled={isLoading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={passwordError}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="dob"
          label="Ngày sinh"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          disabled={isLoading}
          inputProps={{ className: "h-11" }}
        />

        <div className="grid gap-2">
          <Label htmlFor="gender">Giới tính</Label>
          <Select
            value={gender}
            onValueChange={(value) =>
              setGender(value as RegisterData["gender"])
            }
            disabled={isLoading}
          >
            <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Chọn giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Nam</SelectItem>
              <SelectItem value="FEMALE">Nữ</SelectItem>
              <SelectItem value="OTHER">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" disabled={isLoading || isFormInvalid}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Đăng ký
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
