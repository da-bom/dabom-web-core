'use client';

import { cn } from '@shared';

import { useGetRewardTemplates } from 'src/api/reward/useGetRewardTemplates';

interface GifticonRewardProps {
  value: number | null;
  onSelect: (v: number, name: string) => void;
}

const GifticonReward = ({ value, onSelect }: GifticonRewardProps) => {
  const { data: templates } = useGetRewardTemplates('GIFTICON');

  return (
    <div className="animate-in fade-in mt-10 flex flex-col gap-5 duration-300">
      <p className="flex flex-col gap-2">
        <span className="text-h2-m">
          보상으로 제공될 <br />
          기프티콘을 선택해 주세요.
        </span>
        <span className="text-body2-m text-gray-700">
          이번달 잔여 기프티콘: {templates?.length ?? 0}
        </span>
      </p>
      <div className="mb-40 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {templates?.map((reward) => (
          <button
            key={reward.id}
            type="button"
            onClick={() => onSelect(reward.id, reward.name)}
            className={cn(
              'flex h-45 flex-col items-center justify-between rounded-2xl border p-4 transition-all',
              value === reward.id
                ? 'bg-primary-100 border-gray-500'
                : 'border-gray-200 bg-white text-gray-700',
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reward.thumbnailUrl ?? ''}
              alt={reward.name}
              className="h-24 w-24 object-contain"
            />
            <p className="flex flex-col text-center">
              <span className="text-body2-m break-keep whitespace-pre-wrap">{reward.name}</span>
              <span className="text-caption-m text-gray-500">
                {reward.price.toLocaleString()}원
              </span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GifticonReward;
