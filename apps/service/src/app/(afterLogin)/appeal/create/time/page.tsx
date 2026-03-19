'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Box, Skeleton } from '@mui/material';
import { Button, MainBox, cn } from '@shared';

import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';
import UnblockToggleBox from 'src/components/appeal/UnblockToggleBox';
import TimeSettingSheet from 'src/components/policy/TimeSettingBottomSheet';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserId } from 'src/utils/auth';

const TimeLimitSkeleton = () => (
  <div className="bg-background-base flex flex-col gap-7 px-5 pt-20">
    <div className="flex w-full flex-col items-start gap-2">
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="45%" height={24} />
    </div>

    <div className="flex w-full flex-col gap-4">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={80}
        sx={{ borderRadius: '16px' }}
        animation="wave"
      />

      <Box className="flex h-[120px] w-full items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-8">
        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: '4px' }} />
          <Skeleton variant="text" width={20} />
          <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: '4px' }} />
          <Skeleton variant="text" width={20} />
        </div>
      </Box>
    </div>

    <div className="fixed bottom-24 left-0 flex w-full gap-2 px-5">
      <Skeleton variant="rectangular" width="30%" height={52} sx={{ borderRadius: '12px' }} />
      <Skeleton variant="rectangular" width="70%" height={52} sx={{ borderRadius: '12px' }} />
    </div>
  </div>
);

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
  const [isUnblockRequested, setIsUnblockRequested] = useState(false);

  const [isStartSheetOpen, setIsStartSheetOpen] = useState(false);
  const [isEndSheetOpen, setIsEndSheetOpen] = useState(false);

  React.useEffect(() => {
    if (currentUser?.timeLimit) {
      setStartTime(currentUser.timeLimit.start);
      setEndTime(currentUser.timeLimit.end);
    }
  }, [currentUser?.timeLimit]);

  if (isLoading) return <TimeLimitSkeleton />;

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
          <p className="text-body2-m text-gray-700">
            {APPEAL_UI_TEXT.CURRENT_TIME_LABEL}: {currentStart} ~ {currentEnd}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <UnblockToggleBox
            isUnblockRequested={isUnblockRequested}
            onToggle={() => setIsUnblockRequested(!isUnblockRequested)}
          />

          <MainBox
            className={cn(
              'flex h-22 w-full flex-col items-center justify-center gap-4 rounded-2xl border transition-colors',
              isUnblockRequested
                ? 'bg-background-sub border-gray-200 px-4 py-8'
                : 'bg-brand-white border-gray-200 px-4 py-8',
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => !isUnblockRequested && setIsStartSheetOpen(true)}
                disabled={isUnblockRequested}
                className={cn(
                  'flex h-6 w-15 items-center justify-center rounded border px-2 transition-colors',
                  isUnblockRequested
                    ? 'border-background-sub bg-gray-100'
                    : 'bg-primary-50 border-primary-200',
                )}
              >
                <span className={cn('text-body1-m', isUnblockRequested ? 'text-gray-500' : '')}>
                  {startTime}
                </span>
              </button>
              <span className={cn('text-body1-m', isUnblockRequested ? 'text-gray-500' : '')}>
                {APPEAL_UI_TEXT.FROM}
              </span>

              <button
                type="button"
                onClick={() => !isUnblockRequested && setIsEndSheetOpen(true)}
                disabled={isUnblockRequested}
                className={cn(
                  'flex h-6 w-15 items-center justify-center rounded border px-2 transition-colors',
                  isUnblockRequested
                    ? 'border-background-sub bg-gray-100'
                    : 'bg-primary-50 border-primary-200',
                )}
              >
                <span className={cn('text-body1-m', isUnblockRequested ? 'text-gray-500' : '')}>
                  {endTime}
                </span>
              </button>
              <span className={cn('text-body1-m', isUnblockRequested ? 'text-gray-500' : '')}>
                {APPEAL_UI_TEXT.TO}
              </span>
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
              `/appeal/create/reason?id=${myPolicyId || ''}&start=${startTime}&end=${endTime}&unblock=${isUnblockRequested}&policy=${encodeURIComponent(APPEAL_TYPE_LABEL.TIME_BLOCK)}`,
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
    <Suspense fallback={<TimeLimitSkeleton />}>
      <TimeLimitAppealContent />
    </Suspense>
  );
}
