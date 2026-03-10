'use client';

import { Button, DaboIcon } from '@shared';

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center px-7.75">
      <div className="flex flex-col items-center">
        <DaboIcon type="hurt" width={130} height={130} />

        <p className="text-body2-d mt-6 text-center">네트워크를 다시 확인해 주세요.</p>

        <div className="mt-29.5">
          <Button type="submit" size="lg" color="dark" onClick={handleReload}>
            새로고침 하기
          </Button>
        </div>
      </div>
    </main>
  );
}
