"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Bomi, Button, Logo } from "@shared";

export default function SignupPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="bg-background-base flex min-h-screen flex-col items-center justify-center">
      <main className="flex w-82 flex-col items-center">
        <div className="flex flex-col items-center gap-17.5">
          <Bomi className="h-50 w-50 animate-bounce" />
          <Logo className="h-8.25 w-46" />
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-[120px] flex w-full flex-col gap-2"
        >
          <Button type="submit" size="lg" color="dark">
            회원가입
          </Button>

          <div className="flex items-center justify-center gap-1 text-[12px] font-medium text-black">
            <span>이미 계정이 있다면?</span>
            <Link href="/login">로그인</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
