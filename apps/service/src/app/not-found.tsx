'use client';

import { useRouter } from 'next/navigation';

import { Button, DaboIcon } from '@shared';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center px-7.75">
      <div className="flex flex-col items-center">
        <DaboIcon type="hurt" width={130} height={130} />

        <p className="text-body2-d mt-6 text-center">앗, 접근할 수 없는 페이지예요.</p>

        <div className="mt-29.5">
          <Button type="button" size="lg" color="dark" onClick={handleGoHome}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  );
}
