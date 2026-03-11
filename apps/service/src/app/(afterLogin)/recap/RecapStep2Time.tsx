'use client';

import React from 'react';

import { cn } from '@shared';
import { RECAP_UI_TEXT } from 'src/constants/recap';

interface RecapStep2TimeProps {
  startHour: number;
  endHour: number;
}

export function RecapStep2Time({ startHour, endHour }: RecapStep2TimeProps) {
  const isMorning = startHour >= 6 && startHour < 18;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden transition-colors duration-500">
      <div className="relative mt-[140px] px-[27px]"></div>

      <div className="mt-[114px] px-[39px]">
        <h1
          className={cn(
            'text-[24px] leading-[29px] font-semibold break-keep',
            isMorning ? 'text-brand-black' : 'text-brand-white',
          )}
        >
          {startHour}~{endHour}
          {isMorning ? RECAP_UI_TEXT.STEP2_MORNING_SUFFIX : RECAP_UI_TEXT.STEP2_NIGHT_SUFFIX}
        </h1>
      </div>
    </div>
  );
}
