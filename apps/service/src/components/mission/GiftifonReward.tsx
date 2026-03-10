import { cn } from '@shared';

import { REWARD } from 'src/data/reward';

const GifticonReward = ({
  value,
  onSelect,
}: {
  value: number | null;
  onSelect: (v: number) => void;
}) => (
  <div className="animate-in fade-in mt-10 flex flex-col gap-5 duration-300">
    <p className="flex flex-col gap-2">
      <span className="text-h2-m">
        보상으로 제공될 <br />
        기프티콘을 선택해 주세요.
      </span>
      {/* TODO: API 응답값으로 수정 */}
      <span className="text-body2-m text-gray-700">이번달 잔여 기프티콘: 2</span>
    </p>
    <div className="mb-40 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {REWARD.map((reward) => (
        <button
          key={reward.id}
          onClick={() => onSelect(reward.id)}
          className={cn(
            'flex h-45 flex-col items-center justify-between rounded-2xl border p-4 transition-all',
            value === reward.id
              ? 'bg-primary-100 border-gray-500'
              : 'border-gray-200 bg-white text-gray-700',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={reward.imgUrl} alt={reward.name} className="w-24" />
          <p className="flex flex-col">
            <span className="text-body2-m font-bold">{reward.brand}</span>
            <span className="text-body2-m">{reward.name}</span>
          </p>
        </button>
      ))}
    </div>
  </div>
);

export default GifticonReward;
