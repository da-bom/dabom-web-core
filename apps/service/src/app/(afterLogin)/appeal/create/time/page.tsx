'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, MainBox } from '@shared';

import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';
import TimeSettingSheet from 'src/components/policy/TimeSettingBottomSheet';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserId } from 'src/utils/auth';

function TimeLimitAppealContent() {
  const router = useRouter();

  const { data: familyData, isLoading, isError, refetch } = useGetFamilyPolicies();
  const currentUserId = getCurrentUserId();

  const currentUser = familyData?.customers.find((c) => c.customerId === currentUserId);
  const myPolicyId = currentUser?.assignmentIds?.timeBlock;

  const currentStart = currentUser?.timeLimit?.start || '23:00';
  const currentEnd = currentUser?.timeLimit?.end || '07:00';

  const [startTime, setStartTime] = useState(currentStart);
  const [endTime, setEndTime] = useState(currentEnd);

  const [isStartSheetOpen, setIsStartSheetOpen] = useState(false);
  const [isEndSheetOpen, setIsEndSheetOpen] = useState(false);

  React.useEffect(() => {
    if (currentUser?.timeLimit) {
      setStartTime(currentUser.timeLimit.start);
      setEndTime(currentUser.timeLimit.end);
    }
  }, [currentUser?.timeLimit]);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center">
        <p className="text-body1-m">가족 데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !familyData) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center p-8 text-center">
        <p className="text-h2-m mb-4">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <Button size="md" color="light" onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">{APPEAL_UI_TEXT.TIME_LIMIT_TITLE}</h1>
          <p className="text-body2-m text-gray-700">{APPEAL_UI_TEXT.TIME_LIMIT_DESCRIPTION}</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="bg-background-sub flex h-fit w-full items-center justify-center rounded-2xl border border-gray-200 px-4 py-4">
            <span className="text-body1-m">
              {APPEAL_UI_TEXT.CURRENT_TIME_LABEL}: {currentStart} ~ {currentEnd}
            </span>
          </div>

          <MainBox className="bg-brand-white flex h-fit w-full flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 px-4 py-8">
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsStartSheetOpen(true)}
                className="bg-primary-50 border-primary-200 flex h-6 w-15 items-center justify-center rounded border px-2"
              >
                <span className="text-body1-m">{startTime}</span>
              </button>
              <span className="text-body1-m">{APPEAL_UI_TEXT.FROM}</span>

              <button
                type="button"
                onClick={() => setIsEndSheetOpen(true)}
                className="bg-primary-50 border-primary-200 flex h-6 w-15 items-center justify-center rounded border px-2"
              >
                <span className="text-body1-m">{endTime}</span>
              </button>
              <span className="text-body1-m">{APPEAL_UI_TEXT.TO}</span>
            </div>
          </MainBox>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="light" className="w-24" onClick={() => router.back()}>
          이전
        </Button>
        <Button
          size="lg"
          color="dark"
          onClick={() =>
            router.push(
              `/appeal/create/reason?id=${myPolicyId || ''}&start=${startTime}&end=${endTime}&policy=${encodeURIComponent(APPEAL_TYPE_LABEL.TIME_BLOCK)}`,
            )
          }
        >
          다음
        </Button>
      </div>

      <TimeSettingSheet
        isOpen={isStartSheetOpen}
        onClose={() => setIsStartSheetOpen(false)}
        title={APPEAL_UI_TEXT.START_TIME_SETTING}
        initialTime={startTime}
        onSave={setStartTime}
      />

      <TimeSettingSheet
        isOpen={isEndSheetOpen}
        onClose={() => setIsEndSheetOpen(false)}
        title={APPEAL_UI_TEXT.END_TIME_SETTING}
        initialTime={endTime}
        onSave={setEndTime}
      />
    </div>
  );
}

export default function TimeLimitAppealPage() {
  return (
    <Suspense fallback={<div className="bg-background-base h-full min-h-screen" />}>
      <TimeLimitAppealContent />
    </Suspense>
  );
}
