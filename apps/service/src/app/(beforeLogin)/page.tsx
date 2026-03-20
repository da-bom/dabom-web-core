'use client';

import { useRouter } from 'next/navigation';

import { Button, DaboIcon, Logo } from '@shared';

export default function SignupPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="mt-65 flex flex-col items-center">
        <div className="flex flex-col items-center gap-7">
          <div className="flex animate-bounce items-center justify-center">
            <DaboIcon type="default" sx={{ width: '130px', height: '130px' }} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <Logo type="default" sx={{ width: '182px', height: '42px' }} />
          </div>
        </div>

        <form onSubmit={handleLogin} className="mt-37.25 flex flex-col items-center">
          <Button type="submit" size="lg" color="dark">
            로그인
          </Button>
        </form>
      </main>
    </div>
  );
}
