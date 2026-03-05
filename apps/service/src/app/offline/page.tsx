'use client';

import { Button, DaboIcon } from '@shared';

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-7.75">
      <div className="mb-6">
        <DaboIcon type="hurt" />
      </div>

      <p className="text-body2-d mb-29.5 text-center">네트워크를 다시 확인해 주세요.</p>

      <div>
        <Button type="submit" size="lg" color="dark" onClick={handleReload}>
          새로고침 하기
        </Button>
      </div>
    </main>
  );
}
