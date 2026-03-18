'use client';

import { ChevronIcon } from '@icons';
import { cn } from '@shared';
import dayjs from 'dayjs';

interface MonthNavigatorProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

const MonthNavigator = ({ year, month, onPrev, onNext }: MonthNavigatorProps) => {
  const displayedDate = dayjs(new Date(year, month - 1));
  const isNextDisabled =
    displayedDate.isSame(dayjs(), 'month') || displayedDate.isAfter(dayjs(), 'month');

  return (
    <div className="flex h-6 w-fit flex-row items-center justify-center gap-10 select-none">
      <button
        onClick={onPrev}
        className="flex cursor-pointer items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
        aria-label="이전 달로 이동"
      >
        <ChevronIcon sx={{ width: 16 }} className="rotate-180" />
      </button>

      <span className="text-body1-m w-fit text-center tabular-nums">
        {year}년 {month}월
      </span>

      <button
        onClick={onNext}
        className={cn(
          'flex items-center justify-center transition-opacity',
          !isNextDisabled && 'cursor-pointer hover:opacity-70 active:scale-95',
          isNextDisabled,
        )}
        aria-label="다음 달로 이동"
        disabled={isNextDisabled}
      >
        <ChevronIcon sx={{ width: 16 }} className={cn(isNextDisabled && 'text-gray-200')} />
      </button>
    </div>
  );
};

export default MonthNavigator;
