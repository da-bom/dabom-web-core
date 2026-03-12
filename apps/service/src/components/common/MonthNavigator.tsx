'use client';

import { ChevronIcon } from '@icons';

interface MonthNavigatorProps {
  currentDateText: string;
  onPrev: () => void;
  onNext: () => void;
}

const MonthNavigator = ({ currentDateText, onPrev, onNext }: MonthNavigatorProps) => {
  const handlePrev = () => {
    onPrev();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex h-6 w-fit flex-row items-center justify-center gap-10 select-none">
      <button
        onClick={handlePrev}
        className="flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
        aria-label="이전 달로 이동"
      >
        <ChevronIcon sx={{ width: 16 }} className="rotate-180" />
      </button>

      <span className="text-body1-m w-fit text-center tabular-nums">{currentDateText}</span>

      <button
        onClick={handleNext}
        className="flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
        aria-label="다음 달로 이동"
      >
        <ChevronIcon sx={{ width: 16 }} />
      </button>
    </div>
  );
};

export default MonthNavigator;
