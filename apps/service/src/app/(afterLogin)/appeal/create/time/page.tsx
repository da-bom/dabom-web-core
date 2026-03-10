'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, MainBox } from '@shared';

import TimeSettingSheet from 'src/components/policy/TimeSettingBottomSheet';

const CURRENT_START = '23:00';
const CURRENT_END = '07:00';

function TimeLimitAppealContent() {
  const router = useRouter();

  const [startTime, setStartTime] = useState('23:00');
  const [endTime, setEndTime] = useState('07:00');

  const [isStartSheetOpen, setIsStartSheetOpen] = useState(false);
  const [isEndSheetOpen, setIsEndSheetOpen] = useState(false);

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">변경을 원하는 시간은 언제인가요?</h1>
          <p className="text-body2-m text-gray-700">description</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="bg-background-sub flex h-fit w-full items-center justify-center rounded-2xl border border-gray-200 px-4 py-4">
            <span className="text-body1-m">
              현재 제한: {CURRENT_START} ~ {CURRENT_END}
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
              <span className="text-body1-m">부터</span>

              <button
                type="button"
                onClick={() => setIsEndSheetOpen(true)}
                className="bg-primary-50 border-primary-200 flex h-6 w-15 items-center justify-center rounded border px-2"
              >
                <span className="text-body1-m">{endTime}</span>
              </button>
              <span className="text-body1-m">까지</span>
            </div>
          </MainBox>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="light" className="w-24" onClick={() => router.back()}>
          이전
        </Button>
        <Button size="lg" color="dark" onClick={() => router.push('/appeal/objection')}>
          다음
        </Button>
      </div>

      <TimeSettingSheet
        isOpen={isStartSheetOpen}
        onClose={() => setIsStartSheetOpen(false)}
        title="시작 시간 설정"
        initialTime={startTime}
        onSave={setStartTime}
      />

      <TimeSettingSheet
        isOpen={isEndSheetOpen}
        onClose={() => setIsEndSheetOpen(false)}
        title="종료 시간 설정"
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
