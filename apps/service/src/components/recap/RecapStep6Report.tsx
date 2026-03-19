'use client';

import React from 'react';

import { DaboIcon } from '@shared';

import { RECAP_UI_TEXT } from 'src/constants/recap';

interface RecapStep6ReportProps {
  score: number;
}

export function RecapStep6Report({ score }: RecapStep6ReportProps) {
  const isHighScore = score >= 70;
  const title = isHighScore ? RECAP_UI_TEXT.STEP6_HIGH_SCORE : RECAP_UI_TEXT.STEP6_LOW_SCORE;

  return (
    <div className="flex flex-1 flex-col items-center gap-16 p-8">
      <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
        {title}
      </h1>

      <div className="flex flex-none flex-col items-center justify-center">
        <DaboIcon type={isHighScore ? 'good' : 'smile'} sx={{ width: 180 }} />
      </div>
    </div>
  );
}
