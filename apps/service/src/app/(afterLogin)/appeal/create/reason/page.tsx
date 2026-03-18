'use client';

import React, { Suspense, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@shared';

import { usePatchAppealRespond } from 'src/api/appeal/usePatchAppealRespond';
import { usePostEmergencyAppeal } from 'src/api/appeal/usePostEmergencyAppeal';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { showToast } from 'src/utils/toast';

function AppealReasonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reason, setReason] = useState('');

  const appealId = Number(searchParams.get('id'));
  const action = searchParams.get('action');
  const isRejection = action === 'REJECTED';

  const policyType = searchParams.get('policy');
  const isEmergency = policyType === APPEAL_TYPE_LABEL.EMERGENCY;

  const { mutateAsync: postEmergency } = usePostEmergencyAppeal();
  const { mutateAsync: respondAppeal } = usePatchAppealRespond(appealId);

  const handleComplete = async () => {
    if (!reason.trim()) {
      showToast.error(APPEAL_UI_TEXT.REASON_INPUT_ERROR);
      return;
    }

    if (isRejection) {
      try {
        await respondAppeal({ action: 'REJECTED', rejectReason: reason });
        router.replace('/appeal');
      } catch (error) {
        console.error('거절 처리 실패:', error);
      }
      return;
    }

    if (isEmergency) {
      try {
        await postEmergency(reason);
        router.replace('/appeal');
      } catch (error) {
        console.error('긴급 요청 실패:', error);
      }
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('reason', reason);
    router.push(`/appeal/create/confirm?${params.toString()}`);
  };

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">
            {isRejection ? APPEAL_UI_TEXT.REJECT_REASON : APPEAL_UI_TEXT.REASON_INPUT_TITLE}
          </h1>
          <p className="text-body2-m text-gray-700">
            {isRejection
              ? APPEAL_UI_TEXT.REJECT_REASON_DESCRIPTION
              : APPEAL_UI_TEXT.REASON_INPUT_DESCRIPTION}
          </p>
        </div>

        <div className="bg-brand-white flex h-38 w-full flex-col rounded-2xl border border-gray-200 p-4">
          <textarea
            className="text-body1-m h-full w-full resize-none outline-none placeholder:text-gray-500"
            placeholder={APPEAL_UI_TEXT.REASON_INPUT_PLACEHOLDER}
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
          {isRejection ? '거절하기' : '다음'}
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
