import { useState } from 'react';

import { Button, cn } from '@shared';

import { DATA } from 'src/constants/reward';
import { REWARD } from 'src/data/reward';
import { REWARD_TYPES } from 'src/types/rewardType';

const Step3Reward = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const [selectedRewardType, setSelectedRewardType] = useState<string | null>(null);
  const [selectedRewardValue, setSelectedRewardValue] = useState<number | null>(null);

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="mt-30 flex flex-col gap-7">
        <p className="flex flex-col gap-2">
          <span className="text-h2-m">보상을 선택하세요.</span>
          <span className="text-body2-m text-gray-700">미션 완료 시 지급할 보상을 골라주세요.</span>
        </p>

        <div className="grid grid-cols-2 gap-4">
          {REWARD_TYPES.map(({ id, label }) => {
            const isSelected = selectedRewardType === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setSelectedRewardType(id);
                  setSelectedRewardValue(null);
                }}
                className={cn(
                  'h-14 rounded-2xl border transition-all',
                  isSelected
                    ? 'bg-primary-100 text-brand-dark border-gray-500'
                    : 'border-gray-200 bg-white text-gray-700',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          {selectedRewardType === 'DATA' && (
            <div className="flex flex-col gap-3">
              <p className="flex flex-col gap-2">
                <span className="text-h2-m">보상으로 얼마를 제공할까요?</span>
                <span className="text-body2-m text-gray-700">이번달 잔여 보상 데이터: 5GB</span>
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {DATA.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedRewardValue(option.value)}
                    className={cn(
                      'h-14 rounded-2xl border transition-all',
                      selectedRewardValue === option.value
                        ? 'bg-primary-100 text-brand-dark border-gray-500'
                        : 'border-gray-200 bg-white text-gray-700',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedRewardType === 'GIFTICON' && (
            <div className="flex flex-col gap-5">
              <p className="flex flex-col gap-2">
                <span className="text-h2-m">
                  보상으로 제공될
                  <br />
                  기프티콘을 선택해 주세요.
                </span>
                <span className="text-body2-m text-gray-700">이번달 잔여 기프티콘: 2</span>
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {REWARD.map((reward) => {
                  return (
                    <button
                      key={reward.id}
                      className={cn(
                        'bg-brand-white flex h-55 flex-col items-center rounded-2xl border border-gray-100 p-4',
                        selectedRewardValue === reward.id
                          ? 'bg-primary-100 text-brand-dark border-gray-500'
                          : 'border-gray-200 bg-white text-gray-700',
                      )}
                      onClick={() => setSelectedRewardValue(reward.id)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={reward.imgUrl} alt={`${reward.brand}${reward.name}`} />
                      <span className="text-body2-m font-bold">{reward.brand}</span>
                      <span className="text-body2-m">{reward.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="w-fill flex gap-2">
        <Button size="lg" color="light" isFullWidth onClick={prevStep}>
          이전
        </Button>
        <Button
          size="lg"
          color="dark"
          isFullWidth
          onClick={nextStep}
          disabled={!selectedRewardType || !selectedRewardValue}
        >
          다음
        </Button>
      </footer>
    </div>
  );
};

export default Step3Reward;
