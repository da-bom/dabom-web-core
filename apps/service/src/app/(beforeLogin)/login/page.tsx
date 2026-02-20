"use client";

import { useState } from "react";

import { Button, Icon, InputField } from "@shared";
import { useLogin } from "src/hooks/useLogin";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const { mutate: login, isPending: isLoading } = useLogin();

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!phone || !password) {
      alert("전화번호와 비밀번호를 입력해주세요.");
      return;
    }
    login(
      { phone, password },
      {
        onError: () => {
          setIsLoginFailed(true);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen justify-center">
      <main className="flex flex-col justify-center">
        <form onSubmit={handleLogin} className="flex flex-col items-center">
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
              onChange={(value) => {
                setPassword(value);
                setIsLoginFailed(false);
              }}
            />

            {isLoginFailed && (
              <div className="flex flex-row items-center justify-center gap-1">
                <Icon name="Warning" className="text-negative h-3.5 w-3.5" />
                <span className="text-body2-m text-negative">
                  아이디 또는 비밀번호가 일치하지 않습니다.
                </span>
              </div>
            )}
          </div>

          <div className="mt-57 flex w-full justify-center">
            <Button type="submit" size="lg" color="dark" disabled={isLoading}>
              로그인
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
