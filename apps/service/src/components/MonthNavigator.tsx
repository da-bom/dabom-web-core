"use client";

import { Icon } from "@repo/shared/src";

interface MonthNavigatorProps {
  currentDateText: string;
  onPrev: () => void;
  onNext: () => void;
}

const MonthNavigator = ({
  currentDateText,
  onPrev,
  onNext,
}: MonthNavigatorProps) => {
  const handlePrev = () => {
    onPrev();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex items-center justify-center gap-10 py-2 select-none">
      <button
        onClick={handlePrev}
        className="flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
        aria-label="이전 달로 이동"
      >
        <Icon name="Chevron" />
      </button>

      <span className="text-body1-m w-28 text-center tabular-nums">
        {currentDateText}
      </span>

      <button
        onClick={handleNext}
        className="flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
        aria-label="다음 달로 이동"
      >
        <div className="rotate-180">
          <Icon name="Chevron" />
        </div>
      </button>
    </div>
  );
};

export default MonthNavigator;
