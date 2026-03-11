'use client';

import React from 'react';

import { DaboMoon, DaboSun } from '@shared';

import { RECAP_UI_TEXT } from 'src/constants/recap';

interface RecapStep2TimeProps {
  startHour: number;
  endHour: number;
}

export function RecapStep2Time({ startHour, endHour }: RecapStep2TimeProps) {
  const isMorning = startHour >= 6 && startHour < 18;

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="mt-[29px] pl-[27px]">{isMorning ? <DaboSun /> : <DaboMoon />}</div>

      <div className="mt-[114px] pl-[39px]">
        <h1
          className={`text-h1-m w-fit leading-[29px] break-keep whitespace-pre-line ${
            isMorning ? 'text-brand-black' : 'text-brand-white'
          }`}
        >
          {startHour}~{endHour}
          {isMorning ? RECAP_UI_TEXT.STEP2_MORNING_SUFFIX : RECAP_UI_TEXT.STEP2_NIGHT_SUFFIX}
        </h1>
      </div>
    </div>
  );
}
