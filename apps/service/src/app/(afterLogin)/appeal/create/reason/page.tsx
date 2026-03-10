'use client';

import React, { Suspense, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { Button } from '@shared';

function AppealReasonContent() {
  const router = useRouter();
  const [reason, setReason] = useState('');

  const handleComplete = () => {
    if (!reason.trim()) {
      toast.error('사유를 입력해 주세요.');
      return;
    }

    router.push('/appeal');
  };

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">사유를 입력해 주세요.</h1>
          <p className="text-body2-m text-gray-700">description</p>
        </div>

        <div className="bg-brand-white flex h-38 w-full flex-col rounded-2xl border border-gray-200 p-4">
          <textarea
            className="text-body1-m h-full w-full resize-none outline-none placeholder:text-gray-500"
            placeholder="입력하세요.."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="light" onClick={() => router.back()}>
          이전
        </Button>
        <Button size="lg" color="dark" onClick={handleComplete}>
          다음
        </Button>
      </div>
    </div>
  );
}

export default function AppealReasonPage() {
  return (
    <Suspense fallback={<div className="h-full min-h-screen" />}>
      <AppealReasonContent />
    </Suspense>
  );
}
