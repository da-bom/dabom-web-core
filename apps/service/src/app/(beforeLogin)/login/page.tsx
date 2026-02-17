"use client";

import { useState } from "react";

import { Button, InputField } from "@shared";
import { useLogin } from "src/hooks/useLogin";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending: isLoading } = useLogin();

  const handleLogin = () => {
    if (!phone || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    login({ phone, password });
  };

  return (
    <div className="bg-background-base min-h-screen">
      <main className="px-5 pt-53.25">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col gap-10">
            <InputField
              label="전화번호"
              type="tel"
              placeholder="전화번호를 입력해주세요"
              value={phone}
              onChange={(value) => setPhone(value)}
            />

            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(value) => setPassword(value)}
            />

            <div className="mt-53.25 flex justify-center">
              <Button type="submit" size="lg" color="dark" disabled={isLoading}>
                로그인
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
