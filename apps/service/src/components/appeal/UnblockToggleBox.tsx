'use client';

import React from 'react';

import { cn } from '@shared';

import { APPEAL_UI_TEXT } from 'src/constants/appeal';

interface UnblockToggleBoxProps {
  isUnblockRequested: boolean;
  onToggle: () => void;
  text?: string;
}

export default function UnblockToggleBox({
  isUnblockRequested,
  onToggle,
  text = APPEAL_UI_TEXT.UNBLOCK,
}: UnblockToggleBoxProps) {
  return (
    <div className="bg-brand-white flex h-14 w-full flex-row items-center justify-between rounded-2xl border border-gray-200 px-4 py-4">
      <span className="text-body1-m text-brand-black">{text}</span>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'relative flex h-4 w-7 cursor-pointer items-center rounded-full transition-colors duration-200',
          isUnblockRequested ? 'bg-primary-500' : 'bg-gray-500',
        )}
      >
        <span
          className={cn(
            'absolute h-3 w-3 transform rounded-full bg-white transition-transform duration-200',
            isUnblockRequested ? 'translate-x-[14px]' : 'translate-x-[2px]',
          )}
        />
      </button>
    </div>
  );
}
