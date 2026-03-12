'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, MainBox } from '@shared';

import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';
import TimeSettingSheet from 'src/components/policy/TimeSettingBottomSheet';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserId } from 'src/utils/auth';

const CURRENT_START = '23:00';
const CURRENT_END = '07:00';

function TimeLimitAppealContent() {
  const router = useRouter();

  const [startTime, setStartTime] = useState('23:00');
  const [endTime, setEndTime] = useState('07:00');

  const [isStartSheetOpen, setIsStartSheetOpen] = useState(false);
  const [isEndSheetOpen, setIsEndSheetOpen] = useState(false);

  const { data: familyData } = useGetFamilyPolicies();
  const currentUserId = getCurrentUserId();

  const myPolicyId = familyData?.customers.find((c) => c.customerId === currentUserId)
    ?.assignmentIds.timeBlock;

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
              {APPEAL_UI_TEXT.CURRENT_TIME_LABEL}: {CURRENT_START} ~ {CURRENT_END}
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
