'use client';

import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import {
  Badge,
  ChevronIcon,
  DoNotIcon,
  ErrorOutlineIcon,
  TimeIcon,
  bytesToGB,
  cn,
  formatPhoneNumber,
  formatSize,
  gbToBytes,
} from '@shared';

import LimitInput from './LimitInput';

export interface CustomerState {
  customerId: number;
  limitBytes: number;
  timeLimit: {
    start: string;
    end: string;
  } | null;
  isBlocked?: boolean;
}

interface MemberCardProps {
  customer: {
    customerId: number;
    name: string;
    phoneNumber: string;
    monthlyUsedBytes: number;
    monthlyLimitBytes: number;
  };
  state: CustomerState;
  isSelected: boolean;
  isEditingByOther?: boolean;

  handlers: {
    onSelect: (id: string) => void;
    onLimitChange: (id: string, newGB: number) => void | Promise<void>;
    onToggleTime: (id: string) => void;
    onTimeClick: (id: string, type: 'start' | 'end') => void;
    onToggleBlock?: (id: string) => void;
  };
}

export default function MemberCard({
  customer,
  state,
  isSelected,
  isEditingByOther = false,
  handlers,
}: MemberCardProps) {
  const idStr = customer.customerId.toString();

  const LIMIT = {
    MIN: 1,
    MAX: 70,
  } as const;

  const currentLimitGBFromProp = Math.round(bytesToGB(state.limitBytes));
  const [localLimit, setLocalLimit] = useState(Math.max(LIMIT.MIN, currentLimitGBFromProp));

  React.useEffect(() => {
    setLocalLimit(Math.max(LIMIT.MIN, currentLimitGBFromProp));
  }, [currentLimitGBFromProp]);

  const sliderPercentage = ((localLimit - LIMIT.MIN) / (LIMIT.MAX - LIMIT.MIN)) * 100;

  const formattedUsed = formatSize(customer.monthlyUsedBytes).total;
  const displayedTotalBytes = gbToBytes(localLimit);
  const formattedTotal = formatSize(displayedTotalBytes).total;

  const usagePercent =
    displayedTotalBytes === 0
      ? 0
      : Math.min((customer.monthlyUsedBytes / displayedTotalBytes) * 100, 100);

  const isDanger = usagePercent >= 80;

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const isDisabled = isEditingByOther || state.isBlocked;
  const disabledMessage = state.isBlocked ? '데이터 차단 중이에요.' : '다른 가족이 수정 중이에요.';

  const updateLimit = (newGB: number) => {
    const clampedGB = Math.max(LIMIT.MIN, Math.min(newGB, LIMIT.MAX));
    setLocalLimit(clampedGB);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        await handlers.onLimitChange(idStr, clampedGB);
      } catch {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } bg-primary-600 flex h-8 w-85 flex-col items-center justify-center rounded-full`}
            >
              <span className="text-body2-m text-3.5 text-white">
                데이터 한도 조절에 실패했습니다.
              </span>
            </div>
          ),
          {
            duration: 2000,
            position: 'bottom-center',
          },
        );
        setLocalLimit(Math.max(LIMIT.MIN, currentLimitGBFromProp));
      }
    }, 500);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditingByOther) return;
    updateLimit(Number(e.target.value));
  };

  const handleInputChange = (value: string) => {
    if (isEditingByOther) return;
    const numericValue = value.replace(/\D/g, '');
    const newGB = numericValue === '' ? LIMIT.MIN : Number(numericValue);
    updateLimit(newGB);
  };

  return (
    <li
      className={cn(
        'bg-brand-white flex w-full list-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 ease-in-out',
        isSelected ? 'border-gray-700' : 'border-gray-200',
      )}
    >
      <button
        type="button"
        onClick={() => handlers.onSelect(idStr)}
        className="flex w-full flex-col gap-4 p-4 text-left"
        aria-expanded={isSelected}
        aria-controls={`detail-${idStr}`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span className="text-body1-m">{customer.name}</span>
              {state.isBlocked && (
                <Badge color="negative" className="h-4.25 px-2">
                  데이터 차단
                </Badge>
              )}
            </div>
            <span className="text-caption-m text-gray-800">
              {formatPhoneNumber(customer.phoneNumber) || '010-****-1234'}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="text-caption-m">
              <span className={isDanger ? 'text-negative' : 'text-brand-black'}>
                {formattedUsed}{' '}
              </span>
              <span className="text-gray-800">/ {formattedTotal}</span>
            </div>

            <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-100">
              <div
                className={cn(
                  'h-full transition-all duration-300',
                  state.isBlocked ? 'bg-gray-800' : 'bg-primary',
                )}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      <div
        id={`detail-${idStr}`}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          isSelected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-4 h-px bg-gray-400" />

          <div className="flex flex-col gap-4 p-4">
            {/* 데이터 사용 차단 */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <DoNotIcon className="text-primary" />
                <span className="text-body1-m">데이터 사용 차단</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isEditingByOther) handlers.onToggleBlock?.(idStr);
                }}
                role="switch"
                disabled={isEditingByOther}
                aria-checked={state.isBlocked}
                className={cn(
                  'flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out',
                  state.isBlocked ? 'bg-primary' : 'bg-gray-500',
                )}
              >
                <div
                  className={cn(
                    'bg-brand-white h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out',
                    state.isBlocked ? 'translate-x-3' : 'translate-x-0',
                  )}
                />
              </button>
            </div>

            <div className="mx-0 border-t border-gray-100" />

            {/* 데이터 사용 한도 입력 */}
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <ErrorOutlineIcon width={13} height={13} className="text-primary" />
                  <span className="text-body1-m">데이터 사용 한도</span>
                </div>
                <div className="flex items-center gap-1">
                  <LimitInput
                    value={localLimit}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                  <span className="text-body1-m">GB</span>
                </div>
              </div>

              {isDisabled ? (
                <div className="bg-background-sub flex h-12.5 w-full items-center justify-center gap-2 rounded-lg">
                  <DoNotIcon />
                  <span className="text-caption-m text-gray-800">{disabledMessage}</span>
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  <div className="grid h-4 w-full items-center">
                    <div className="col-start-1 row-start-1 h-2 w-full rounded-full bg-gray-100" />
                    <div
                      className="bg-primary col-start-1 row-start-1 h-2 justify-self-start rounded-full"
                      style={{ width: `${sliderPercentage}%` }}
                    />

                    <div
                      className="pointer-events-none col-start-1 row-start-1 flex w-full items-center"
                      style={{ marginLeft: `${sliderPercentage}%` }}
                    >
                      <div className="border-primary bg-brand-white h-4 w-4 -translate-x-1/2 rounded-full border-2 shadow-sm" />
                    </div>
                    <input
                      type="range"
                      min={LIMIT.MIN}
                      max={LIMIT.MAX}
                      step="1"
                      value={localLimit}
                      onChange={handleSliderChange}
                      disabled={isDisabled}
                      className="col-start-1 row-start-1 h-full w-full cursor-pointer touch-none opacity-0"
                      aria-label="데이터 한도 설정"
                    />
                  </div>
                  <div className="text-caption-m flex w-full justify-between text-gray-800">
                    <span>{LIMIT.MIN}GB</span>
                    <span>{LIMIT.MAX}GB</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100" />
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <TimeIcon className="text-primary" />
                  <span className="text-body1-m">시간 제한</span>
                </div>

                <button
                  type="button"
                  onClick={() => !isEditingByOther && handlers.onToggleTime(idStr)}
                  role="switch"
                  disabled={isDisabled}
                  aria-checked={!state.timeLimit}
                  className={cn(
                    'flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out',
                    state.timeLimit ? 'bg-primary-500' : 'bg-gray-500',
                  )}
                >
                  <div
                    className={cn(
                      'bg-brand-white shadow-default h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out',
                      state.timeLimit ? 'translate-x-3' : 'translate-x-0',
                    )}
                  />
                </button>
              </div>

              {isDisabled ? (
                <div className="bg-background-sub flex h-12.25 w-full items-center justify-center gap-2 rounded-lg">
                  <DoNotIcon />
                  <span className="text-caption-m text-gray-800">{disabledMessage}</span>
                </div>
              ) : state.timeLimit ? (
                <div className="bg-background-sub flex h-16 w-full flex-col items-center justify-center gap-2 rounded-lg">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handlers.onTimeClick(idStr, 'start')}
                      className="border-primary-200 bg-primary-50 flex h-6 w-15 items-center justify-center rounded border"
                    >
                      <span className="text-body1-m">{state.timeLimit.start}</span>
                    </button>
                    <span className="text-body1-m mx-2">부터</span>

                    <button
                      type="button"
                      onClick={() => handlers.onTimeClick(idStr, 'end')}
                      className="border-primary-200 bg-primary-50 flex h-6 w-15 items-center justify-center rounded border"
                    >
                      <span className="text-body1-m">{state.timeLimit.end}</span>
                    </button>
                    <span className="text-body1-m ml-2">까지</span>
                  </div>
                </div>
              ) : (
                <div className="bg-background-sub flex h-12 w-full items-center justify-center rounded-lg">
                  <span className="text-caption-m text-gray-800">
                    시간 제한이 설정되지 않았습니다.
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center text-gray-800">
              터치하여 시간을 설정하세요.
            </div>

            <div className="border-t border-gray-400" />

            <button type="button" className="flex w-full justify-end gap-1" onClick={() => {}}>
              <span className="text-body2-m">더보기</span>
              {/* 아이콘 추후 조절 */}
              <ChevronIcon />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
