'use client';

import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { ChevronIcon } from '@icons';
import { Badge, bytesToGB, cn, formatPhoneNumber, formatSize, gbToBytes } from '@shared';

import { PolicyBlockOwner } from './PolicyBlockOwner';
import { PolicyLimitOwner } from './PolicyLimitOwner';
import { PolicyBlock, PolicyLimit, PolicyTime } from './PolicySimple';
import { PolicyTimeOwner } from './PolicyTimeOwner';

export interface CustomerState {
  customerId: number;
  limitBytes: number | null;
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
    monthlyLimitBytes: number | null;
  };
  state: CustomerState;
  isSelected: boolean;
  isOwner?: boolean;
  isEditingByOther?: boolean;
  totalQuotaBytes?: number;

  handlers: {
    onSelect: (id: string) => void;
    onLimitChange: (id: string, newGB: number | null) => void | Promise<void>;
    onToggleTime: (id: string) => void;
    onTimeClick: (id: string, type: 'start' | 'end') => void;
    onToggleBlock?: (id: string) => void;
  };
}

export default function MemberCard({
  customer,
  state,
  isSelected,
  isOwner = true,
  isEditingByOther = false,
  totalQuotaBytes,
  handlers,
}: MemberCardProps) {
  const router = useRouter();
  const idStr = customer.customerId.toString();

  const dynamicMaxGB = totalQuotaBytes ? Math.round(bytesToGB(totalQuotaBytes)) : 70;

  const LIMIT = {
    MIN: 1,
    MAX: dynamicMaxGB,
  } as const;

  const isUnlimited = state.limitBytes === null;
  const currentLimitGBFromProp =
    state.limitBytes === null ? null : Math.round(bytesToGB(state.limitBytes));

  const [localLimit, setLocalLimit] = useState(() => {
    if (currentLimitGBFromProp !== null) return Math.max(LIMIT.MIN, currentLimitGBFromProp);
    return LIMIT.MIN;
  });

  React.useEffect(() => {
    setLocalLimit(Math.max(LIMIT.MIN, currentLimitGBFromProp ?? 0));
  }, [LIMIT.MIN, currentLimitGBFromProp]);

  const sliderPercentage = isUnlimited
    ? 100
    : ((localLimit - LIMIT.MIN) / (LIMIT.MAX - LIMIT.MIN)) * 100;

  const formattedUsed = formatSize(customer.monthlyUsedBytes).total;
  const displayedTotalBytes = isUnlimited ? null : gbToBytes(localLimit);
  const formattedTotal = isUnlimited ? '무제한' : formatSize(displayedTotalBytes || 0).total;

  const usagePercent = isUnlimited
    ? 0
    : !displayedTotalBytes
      ? 0
      : Math.min((customer.monthlyUsedBytes / displayedTotalBytes) * 100, 100);

  const isDanger = !isUnlimited && usagePercent >= 80;

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const isDisabled = !!(isEditingByOther || state.isBlocked);

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
        setLocalLimit(
          currentLimitGBFromProp !== null ? Math.max(LIMIT.MIN, currentLimitGBFromProp) : LIMIT.MIN,
        );
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
        'bg-brand-white flex w-full list-none flex-col overflow-hidden rounded-2xl border transition-all duration-300 ease-in-out',
        isSelected ? 'border-gray-700' : 'border-gray-200',
      )}
    >
      <button
        type="button"
        onClick={() => handlers.onSelect(idStr)}
        className="flex w-full flex-col p-4 text-left"
        aria-expanded={isSelected}
        aria-controls={`detail-${idStr}`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-0.75">
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
              <span className={isDanger ? 'text-negative' : 'text-gray-800'}>{formattedUsed} </span>
              <span>/ {formattedTotal}</span>
            </div>

            <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-100">
              <div
                className={cn(
                  'h-full transition-colors duration-300',
                  state.isBlocked ? 'bg-gray-700' : 'bg-primary',
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
            {!isOwner ? (
              <div className="flex flex-col gap-2">
                <PolicyBlock isBlocked={!!state.isBlocked} />
                <PolicyLimit
                  text={isUnlimited ? '무제한' : `${localLimit}GB`}
                  disabled={state.isBlocked}
                />
                <PolicyTime
                  isOn={!!state.timeLimit}
                  text={`${state.timeLimit?.start || '00:00'} ~ ${state.timeLimit?.end || '00:00'}`}
                  disabled={state.isBlocked}
                />
              </div>
            ) : (
              <>
                <PolicyBlockOwner
                  isBlocked={!!state.isBlocked}
                  isEditingByOther={!!isEditingByOther}
                  onToggleBlock={() => handlers.onToggleBlock?.(idStr)}
                />

                <div className="mx-0 border-t border-gray-100" />

                <PolicyLimitOwner
                  isDisabled={isDisabled}
                  isUnlimited={isUnlimited}
                  localLimit={localLimit}
                  sliderPercentage={sliderPercentage}
                  LIMIT={LIMIT}
                  onLimitToggle={() => {
                    if (!isEditingByOther && !state.isBlocked) {
                      handlers.onLimitChange(idStr, isUnlimited ? localLimit : null);
                    }
                  }}
                  onInputChange={handleInputChange}
                  onSliderChange={handleSliderChange}
                />

                <div className="border-t border-gray-100" />

                <PolicyTimeOwner
                  isDisabled={isDisabled}
                  timeLimit={state.timeLimit}
                  onToggleTime={() => !isEditingByOther && handlers.onToggleTime(idStr)}
                  onTimeClick={(type) => handlers.onTimeClick(idStr, type)}
                />

                <div className="border-t border-gray-400" />
                <button
                  type="button"
                  className="flex h-5.25 w-full items-center justify-end gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/family/detail?customerId=${idStr}`);
                  }}
                >
                  <span className="text-body2-m">더보기</span>
                  <ChevronIcon sx={{ width: 16, height: 12 }} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
