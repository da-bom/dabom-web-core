'use client';

import React from 'react';

import { Block as BlockIcon, CheckCircleOutline as CheckCircleIcon } from '@mui/icons-material';
import { Divider, MainBox } from '@shared';

interface PolicySummaryCardProps {
  policyName: string;
  requestedValue: string;
  previousValue?: string;
  reasonText: React.ReactNode;
  isOwner?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export function PolicySummaryCard({
  policyName,
  requestedValue,
  reasonText,
  isOwner = false,
  onApprove,
  onReject,
}: PolicySummaryCardProps) {
  return (
    <MainBox className="flex w-full flex-col justify-center gap-2 rounded-2xl border border-gray-100 p-5">
      <div className="flex w-full flex-col items-start">
        <div className="text-body1-m text-gray-800">
          <p>정책: {policyName}</p>
          <p>변경: {requestedValue}</p>
        </div>
      </div>
      <Divider />
      <div className="flex w-full items-center">
        <span className="text-body1-m text-gray-800">{reasonText}</span>
      </div>

      {isOwner && (
        <div className="flex w-full items-center gap-4">
          <button
            type="button"
            onClick={onReject}
            className="flex h-12 flex-1 items-center justify-center gap-1 rounded-2xl border border-gray-200"
          >
            <BlockIcon sx={{ fontSize: 15 }} className="text-negative" />
            <span className="text-body1-m">거절하기</span>
          </button>
          <button
            type="button"
            onClick={onApprove}
            className="flex h-12 flex-1 items-center justify-center gap-1 rounded-2xl border border-gray-200"
          >
            <CheckCircleIcon sx={{ fontSize: 15 }} className="text-positive" />
            <span className="text-body1-m">수락하기</span>
          </button>
        </div>
      )}
    </MainBox>
  );
}
