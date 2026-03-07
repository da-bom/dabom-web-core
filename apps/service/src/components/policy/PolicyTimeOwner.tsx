import React from 'react';

import { TimeIcon, cn } from '@shared';

interface PolicyTimeOwnerProps {
  isDisabled: boolean;
  timeLimit: {
    start: string;
    end: string;
  } | null;
  onToggleTime: () => void;
  onTimeClick: (type: 'start' | 'end') => void;
}

export function PolicyTimeOwner({
  isDisabled,
  timeLimit,
  onToggleTime,
  onTimeClick,
}: PolicyTimeOwnerProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <TimeIcon className={cn(isDisabled ? 'text-gray-700' : 'text-primary')} />
            <span className={cn('text-body1-m', isDisabled && 'text-gray-500')}>시간 제한</span>
          </div>

          <button
            type="button"
            onClick={onToggleTime}
            role="switch"
            disabled={isDisabled}
            aria-checked={!!timeLimit}
            className={cn(
              'flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out',
              timeLimit ? (isDisabled ? 'bg-gray-700' : 'bg-primary-500') : 'bg-gray-500',
            )}
          >
            <div
              className={cn(
                'bg-brand-white shadow-default h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out',
                timeLimit ? 'translate-x-3' : 'translate-x-0',
              )}
            />
          </button>
        </div>

        <div className="bg-background-sub flex h-14 w-full flex-col items-center justify-center gap-2 rounded-lg py-4">
          {!timeLimit ? (
            <span className={cn('text-caption-m', isDisabled ? 'text-gray-500' : 'text-gray-800')}>
              시간 제한이 설정되지 않았습니다.
            </span>
          ) : (
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => onTimeClick('start')}
                disabled={isDisabled}
                className={cn(
                  'flex h-6 w-15 items-center justify-center rounded border',
                  isDisabled ? 'border-none bg-gray-100' : 'border-primary-200 bg-primary-50',
                )}
              >
                <span className={cn('text-body1-m', isDisabled ? 'text-gray-500' : 'text-black')}>
                  {timeLimit.start}
                </span>
              </button>
              <span className={cn('text-body1-m mx-2', isDisabled && 'text-gray-500')}>부터</span>

              <button
                type="button"
                onClick={() => onTimeClick('end')}
                disabled={isDisabled}
                className={cn(
                  'flex h-6 w-15 items-center justify-center rounded border',
                  isDisabled ? 'border-none bg-gray-100' : 'border-primary-200 bg-primary-50',
                )}
              >
                <span className={cn('text-body1-m', isDisabled ? 'text-gray-500' : 'text-black')}>
                  {timeLimit.end}
                </span>
              </button>
              <span className={cn('text-body1-m ml-2', isDisabled && 'text-gray-500')}>까지</span>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          'text-caption-m flex items-center justify-center',
          isDisabled ? 'text-gray-700' : 'text-gray-800',
        )}
      >
        터치하여 시간을 설정하세요.
      </div>
    </>
  );
}
