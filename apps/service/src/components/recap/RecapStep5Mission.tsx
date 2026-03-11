'use client';

import React from 'react';

import { CheckOutlinedIcon, SmsFailedIcon } from '@icons';

import { CHART_COLOR } from 'src/app/(afterLogin)/home/contents';
import UsageChart from 'src/components/home/UsageChart';
import { RECAP_UI_TEXT } from 'src/constants/recap';

interface RecapStep5MissionProps {
  totalCount: number;
  successCount: number;
  failureCount: number;
}

export function RecapStep5Mission({
  totalCount,
  successCount,
  failureCount,
}: RecapStep5MissionProps) {
  return (
    <div className="flex h-fit flex-col items-center gap-16 p-8">
      <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
        {RECAP_UI_TEXT.STEP5_TITLE_PREFIX}
        {totalCount}
        {RECAP_UI_TEXT.STEP5_TITLE_SUFFIX}
      </h1>

      <UsageChart
        items={[
          {
            id: 'success',
            name: RECAP_UI_TEXT.SUCCESS,
            value: successCount,
            color: CHART_COLOR.RECAP_SUCCESS,
          },
          {
            id: 'failure',
            name: RECAP_UI_TEXT.FAILURE,
            value: failureCount,
            color: CHART_COLOR.RECAP_FAILURE,
          },
        ]}
        unit="건"
      />
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <CheckOutlinedIcon sx={{ fontSize: 20 }} />
          <span className="text-h2-m">
            {RECAP_UI_TEXT.SUCCESS} {successCount}
            {RECAP_UI_TEXT.COUNT_UNIT}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <SmsFailedIcon sx={{ fontSize: 20 }} />
          <span className="text-h2-m">
            {RECAP_UI_TEXT.FAILURE} {failureCount}
            {RECAP_UI_TEXT.COUNT_UNIT}
          </span>
        </div>
      </div>
    </div>
  );
}
