'use client';

import React from 'react';

import { RECAP_UI_TEXT } from 'src/constants/recap';

interface RecapStep6ReportProps {
  score: number;
}

export function RecapStep6Report({ score }: RecapStep6ReportProps) {
  const title = score >= 70 ? RECAP_UI_TEXT.STEP6_HIGH_SCORE : RECAP_UI_TEXT.STEP6_LOW_SCORE;

  return (
    <div className="flex flex-1 flex-col items-center gap-16 p-8">
      <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
        {title}
      </h1>

      {/* 추가 예정이라서 색상 코드는 하드코딩으로 하겠습니다 */}
      <div className="flex h-36 w-36 flex-none flex-col items-center justify-center bg-[#D9D9D9]">
        <span className="text-h1-m text-center">
          일러스트
          <br />
          추가 예정
        </span>
      </div>
    </div>
  );
}
