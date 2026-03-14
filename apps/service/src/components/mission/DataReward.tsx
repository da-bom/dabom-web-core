'use client';

import { cn } from '@shared';

import { DATA } from 'src/constants/reward';

interface DataRewardProps {
  value: number;
  onSelect: (templateId: number) => void;
}

const DataReward = ({ value, onSelect }: DataRewardProps) => {
  return (
    <div className="animate-in fade-in mt-10 flex flex-col gap-3 duration-300">
      <p className="flex flex-col gap-2">
        <span className="text-h2-m">보상을 얼마를 제공할까요?</span>
        <span className="text-body2-m text-gray-700">이번달 잔여 보상 데이터: 5GB</span>
      </p>

      <div className="mb-110 grid grid-cols-2 gap-4">
        {DATA.map((option) => {
          const isSelected = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                'text-body1-m h-14 rounded-2xl border transition-all',
                isSelected
                  ? 'bg-primary-100 text-brand-dark border-gray-500'
                  : 'border-gray-200 bg-white text-gray-700',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DataReward;
