'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, MainBox, cn } from '@shared';

import Slider from 'src/components/common/Slider';
import LimitInput from 'src/components/policy/LimitInput';
import { APPEAL_TYPE_LABEL } from 'src/constants/appeal';

const MIN_LIMIT = 1;
const MAX_LIMIT = 70;
const CURRENT_LIMIT = 50;

export default function DataLimitAppealPage() {
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState(50);

  const handleInputChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const numValue = numericValue === '' ? MIN_LIMIT : Number(numericValue);
    setSelectedLimit(Math.min(Math.max(numValue, MIN_LIMIT), MAX_LIMIT));
  };

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">변경을 원하는 한도는 얼마인가요?</h1>
          <p className="text-body2-m text-gray-700">description</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="bg-background-sub flex h-fit w-full items-center justify-center rounded-2xl border border-gray-200 px-4 py-4">
            <span className="text-body1-m text-brand-black">현재 한도: {CURRENT_LIMIT}GB</span>
          </div>

          <MainBox className="bg-brand-white flex h-fit w-full flex-col items-center gap-4 rounded-2xl border border-gray-200 px-4 py-8">
            <div className="flex h-fit w-full flex-col gap-1">
              <Slider
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                value={selectedLimit}
                onChange={setSelectedLimit}
              />

              <div
                className={cn('text-caption-m flex w-full justify-between px-1', 'text-gray-800')}
              >
                <span>{MIN_LIMIT}GB</span>
                <span>{MAX_LIMIT}GB</span>
              </div>
            </div>

            <div className="flex h-fit w-full items-center justify-center gap-1">
              <LimitInput value={selectedLimit} onChange={handleInputChange} />
              <span className="text-body1-m text-gray-800">GB</span>
            </div>
          </MainBox>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="light" onClick={() => router.back()}>
          이전
        </Button>
        <Button
          size="lg"
          color="dark"
          onClick={() =>
            router.push(
              `/appeal/create/reason?amount=${selectedLimit}&policy=${encodeURIComponent(APPEAL_TYPE_LABEL.NORMAL)}`,
            )
          }
        >
          다음
        </Button>
      </div>
    </div>
  );
}
