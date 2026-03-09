import { cn } from '@shared';

import { DATA } from 'src/constants/reward';

const DataReward = ({
  value,
  onSelect,
}: {
  value: number | null;
  onSelect: (v: number) => void;
}) => (
  <div className="animate-in fade-in flex flex-col gap-3 duration-300">
    <p className="flex flex-col gap-2">
      <span className="text-h2-m">보상으로 얼마를 제공할까요?</span>
      <span className="text-body2-m text-gray-700">이번달 잔여 보상 데이터: 5GB</span>
    </p>
    <div className="mb-110 grid grid-cols-2 gap-4">
      {DATA.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.value)}
          className={cn(
            'h-14 rounded-2xl border transition-all',
            value === option.value
              ? 'bg-primary-100 border-gray-500'
              : 'border-gray-200 bg-white text-gray-700',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export default DataReward;
