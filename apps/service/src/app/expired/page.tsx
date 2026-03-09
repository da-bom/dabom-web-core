'use client';

import { useRouter } from 'next/navigation';

import { Button, DaboIcon } from '@shared';

export default function TokenExpiredPage() {
  const router = useRouter();

  const handleGoLogin = () => {
    router.push('/login');
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center px-7.75">
      <div className="flex flex-col items-center">
        <DaboIcon type="hurt" width={130} height={130} />

        <p className="text-body2-d mt-6 text-center">
          세션이 만료되었어요.
          <br />
          다시 로그인해 주세요.
        </p>

        <div className="mt-29.5">
          <Button type="button" size="lg" color="dark" onClick={handleGoLogin}>
            로그인하러 가기
          </Button>
        </div>
      </div>
    </main>
  );
}
