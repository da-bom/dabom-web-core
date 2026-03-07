import React from 'react';

import { ErrorOutlineIcon, cn } from '@shared';

import LimitInput from './LimitInput';

interface PolicyLimitOwnerProps {
  isDisabled: boolean;
  isUnlimited: boolean;
  localLimit: number;
  sliderPercentage: number;
  LIMIT: { MIN: number; MAX: number };
  onLimitToggle: () => void;
  onInputChange: (value: string) => void;
  onSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PolicyLimitOwner({
  isDisabled,
  isUnlimited,
  localLimit,
  sliderPercentage,
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
        <button
          type="button"
          onClick={onLimitToggle}
          role="switch"
          disabled={isDisabled}
          aria-checked={!isUnlimited}
          className={cn(
            'flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out',
            !isUnlimited ? (isDisabled ? 'bg-gray-700' : 'bg-primary-500') : 'bg-gray-500',
          )}
        >
          <div
            className={cn(
              'bg-brand-white shadow-default h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out',
              !isUnlimited ? 'translate-x-3' : 'translate-x-0',
            )}
          />
        </button>
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
          <div className="grid h-4 w-full items-center px-1">
            <div className="col-start-1 row-start-1 h-2 w-full rounded-full bg-gray-100" />
            <div
              className={cn(
                'col-start-1 row-start-1 h-2 justify-self-start rounded-l-full transition-colors duration-300',
                isLimitInputDisabled ? 'bg-gray-700' : 'bg-primary',
              )}
              style={{ width: `${sliderPercentage}%` }}
            />

            <div
              className="pointer-events-none col-start-1 row-start-1 flex w-full items-center"
              style={{ marginLeft: `${sliderPercentage}%` }}
            >
              <div
                className={cn(
                  'bg-brand-white h-4 w-4 -translate-x-1/2 rounded-full border-2 shadow-sm transition-colors duration-300',
                  isLimitInputDisabled ? 'border-gray-700' : 'border-primary',
                )}
              />
            </div>
            <input
              type="range"
              min={LIMIT.MIN}
              max={LIMIT.MAX}
              step="1"
              value={localLimit}
              onChange={onSliderChange}
              disabled={isLimitInputDisabled}
              className="col-start-1 row-start-1 h-full w-full cursor-pointer touch-none opacity-0"
              aria-label="데이터 한도 설정"
            />
          </div>
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
