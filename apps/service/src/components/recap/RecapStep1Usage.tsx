'use client';

import React from 'react';

import { RECAP_UI_TEXT } from 'src/constants/recap';

interface UsageByWeekday {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

interface RecapStep1UsageProps {
  usageByWeekday: UsageByWeekday;
  mostUsedWeekday: string;
}

export function RecapStep1Usage({ usageByWeekday, mostUsedWeekday }: RecapStep1UsageProps) {
  const mostUsedLabel =
    RECAP_UI_TEXT.WEEKDAY_LABELS[mostUsedWeekday.toLowerCase() as keyof UsageByWeekday] ||
    RECAP_UI_TEXT.WEEKDAY_LABELS.thursday;

  return (
    <div className="flex flex-1 flex-col items-start gap-10 p-8">
      <h1 className="text-h1-m w-fit leading-[29px] break-keep">
        {mostUsedLabel}
        {RECAP_UI_TEXT.STEP1_TITLE_SUFFIX}
      </h1>

      <div className="flex w-full flex-col gap-4">
        {(Object.entries(RECAP_UI_TEXT.WEEKDAY_LABELS) as [keyof UsageByWeekday, string][]).map(
          ([key, label]) => {
            const value = usageByWeekday[key];
            const barWidth = Math.min(value, 100);

            return (
              <div key={key} className="flex h-fit w-full items-center gap-[13px]">
                <span className="text-body1-m">{label}</span>

                <div className="relative h-2 flex-1 rounded-full border border-gray-200 bg-white">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
