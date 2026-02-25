"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button, InputField, Logo } from "@shared";

import { useLogin } from "../../services/auth/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate: login, isPending: isLoading } = useLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      await login({ email, password });
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 정보가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-brand-white shadow-default flex w-fit flex-col items-center gap-20 rounded-3xl px-20 py-14">
        <Logo type="admin" />
        <div className="flex flex-col gap-7">
          <InputField
            label="이메일"
            type="email"
            value={email}
            placeholder="admin@dabom.com"
            onChange={(value) => setEmail(value)}
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(value) => setPassword(value)}
          />
        </div>
        <Button
          size="lg"
          color="dark"
          onClick={handleLogin}
          disabled={isLoading}
        >
          로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
