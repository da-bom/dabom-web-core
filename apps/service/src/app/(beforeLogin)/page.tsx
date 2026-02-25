'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, DaboIcon, Logo } from '@shared';

const data = {
  name: '김철수',
  usedGB: 100,
  limitGB: 100,
};

export default function SignupPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };
  const usagePercent = Math.min(Math.round((data.usedGB / data.limitGB) * 100), 100);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex w-82 flex-col items-center">
        <div className="flex flex-col items-center gap-17.5">
          <DaboIcon usage={usagePercent} className="h-50 w-50 animate-bounce" />
          <Logo type="default" className="w-46" />
        </div>

        <form onSubmit={handleLogin} className="mt-30 flex w-full flex-col gap-2">
          <Button type="submit" size="lg" color="dark">
            회원가입
          </Button>

          <div className="text-caption-m text-3 flex items-center justify-center gap-1">
            <span>이미 계정이 있다면?</span>
            <Link href="/login" className="text-decoration: underline">
              로그인
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
