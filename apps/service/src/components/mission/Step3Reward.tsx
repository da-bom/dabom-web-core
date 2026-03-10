import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, cn } from '@shared';

import { MissionForm } from 'src/api/mission/schema';
import { REWARD_TYPES } from 'src/types/rewardType';

import DataReward from './DataReward';
import GifticonReward from './GiftifonReward';

const Step3Reward = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const { setValue, watch } = useFormContext<MissionForm>();

  const selectedRewardType = watch('reward.type') as 'DATA' | 'GIFTICON' | undefined;
  const selectedRewardValue = watch('reward.value');

  const detailRef = useRef<HTMLDivElement>(null);

  const handleTypeSelect = (id: string) => {
    setValue('reward.type', id as 'DATA' | 'GIFTICON', { shouldValidate: true });
    setValue('reward.value', 0);
  };

  const handleValueSelect = (value: number | string) => {
    setValue('reward.value', value, { shouldValidate: true });
  };

  useEffect(() => {
    if (selectedRewardType && detailRef.current) {
      detailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedRewardType]);

  return (
    <div className="flex flex-col pb-40">
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
                  type="button"
                  onClick={() => handleTypeSelect(id)}
                  className={cn(
                    'h-14 rounded-2xl border transition-all',
                    selectedRewardType === id
                      ? 'bg-primary-100 text-brand-dark border-gray-500'
                      : 'border-gray-200 bg-white text-gray-700',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section ref={detailRef}>
            {selectedRewardType === 'DATA' && (
              <DataReward
                value={typeof selectedRewardValue === 'string' ? selectedRewardValue : null}
                onSelect={handleValueSelect}
              />
            )}
            {selectedRewardType === 'GIFTICON' && (
              <GifticonReward
                value={typeof selectedRewardValue === 'number' ? selectedRewardValue : null}
                onSelect={handleValueSelect}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="fixed right-0 bottom-25 left-0 mx-5 flex gap-2">
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
