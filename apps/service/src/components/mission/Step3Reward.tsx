import { useState } from 'react';

import { Button, cn } from '@shared';

import { REWARD_TYPES } from 'src/types/rewardType';

import DataReward from './DataReward';
import GifticonReward from './GiftifonReward';

const Step3Reward = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const [selectedRewardType, setSelectedRewardType] = useState<string | null>(null);
  const [selectedRewardValue, setSelectedRewardValue] = useState<number | null>(null);

  const handleTypeSelect = (id: string) => {
    setSelectedRewardType(id);
    setSelectedRewardValue(null);
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-10">
        <div className="flex flex-col gap-40">
          <section className="flex flex-col gap-7">
            <header className="flex flex-col gap-2">
              <h2 className="text-h2-m">보상을 선택하세요.</h2>
              <p className="text-body2-m text-gray-700">미션 완료 시 지급할 보상을 골라주세요.</p>
            </header>

            <div className="grid grid-cols-2 gap-4">
              {REWARD_TYPES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleTypeSelect(id)}
                  className={cn(
                    'h-14 rounded-2xl border transition-all',
                    selectedRewardType === id
                      ? 'bg-primary-100 border-gray-500'
                      : 'border-gray-200 bg-white text-gray-700',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section>
            {selectedRewardType === 'DATA' && (
              <DataReward value={selectedRewardValue} onSelect={setSelectedRewardValue} />
            )}
            {selectedRewardType === 'GIFTICON' && (
              <GifticonReward value={selectedRewardValue} onSelect={setSelectedRewardValue} />
            )}
          </section>
        </div>
      </main>

      <footer className="fixed right-0 bottom-30 left-0 mx-5 flex gap-2">
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
