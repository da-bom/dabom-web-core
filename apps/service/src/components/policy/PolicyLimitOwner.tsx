import React from 'react';

import { ErrorOutlineIcon } from '@icons';
import { cn } from '@shared';

import Slider from '../common/Slider';
import { Toggle } from '../common/Toggle';
import LimitInput from './LimitInput';

interface PolicyLimitOwnerProps {
  isDisabled: boolean;
  isUnlimited: boolean;
  localLimit: number;
  LIMIT: { MIN: number; MAX: number };
  onLimitToggle: () => void;
  onInputChange: (value: string) => void;
  onSliderChange: (value: number) => void;
}

export function PolicyLimitOwner({
  isDisabled,
  isUnlimited,
  localLimit,
  LIMIT,
  onLimitToggle,
  onInputChange,
  onSliderChange,
}: PolicyLimitOwnerProps) {
  const isLimitInputDisabled = isDisabled || isUnlimited;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <ErrorOutlineIcon
            sx={{ fontSize: 16 }}
            className={cn(isDisabled ? 'text-gray-700' : 'text-primary')}
          />
          <span className={cn('text-body1-m', isDisabled && 'text-gray-500')}>
            데이터 사용 한도
          </span>
        </div>
        <Toggle
          isChecked={!isDisabled && !isUnlimited}
          onToggle={onLimitToggle}
          disabled={isDisabled}
        />
      </div>

      <div className="bg-background-sub flex w-full flex-col items-center gap-4 rounded-lg p-4">
        <div className="flex w-full items-center justify-center gap-1">
          <div className="bg flex h-7 items-center justify-center border-gray-400 px-2">
            <LimitInput
              value={localLimit}
              onChange={onInputChange}
              disabled={isLimitInputDisabled}
            />
          </div>
          <span
            className={cn(
              'text-body1-m',
              isLimitInputDisabled ? 'text-gray-500' : 'text-brand-black',
            )}
          >
            GB
          </span>
        </div>

        <div className="flex w-full flex-col gap-1">
          <Slider
            min={LIMIT.MIN}
            max={LIMIT.MAX}
            value={localLimit}
            onChange={onSliderChange}
            disabled={isLimitInputDisabled}
          />
          <div
            className={cn(
              'text-caption-m flex w-full justify-between px-1',
              isLimitInputDisabled ? 'text-gray-700' : 'text-gray-800',
            )}
          >
            <span>{LIMIT.MIN}GB</span>
            <span>{LIMIT.MAX}GB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
