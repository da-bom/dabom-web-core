'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, cn } from '@shared';

import { MissionCreate } from 'src/api/mission/schema';
import { REWARD_TYPES } from 'src/types/rewardType';

import DataReward from './DataReward';
import GifticonReward from './GiftifonReward';

const Step3Reward = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const { setValue, watch } = useFormContext<MissionCreate>();

  const rewardTemplateId = watch('rewardTemplateId');

  const [selectedType, setSelectedType] = useState<'DATA' | 'GIFTICON' | null>(null);

  const detailRef = useRef<HTMLDivElement>(null);

  const handleTypeSelect = (type: 'DATA' | 'GIFTICON' | null) => {
    setSelectedType(type);
    setValue('rewardTemplateId', 0);
  };

  const handleValueSelect = (templateId: number) => {
    setValue('rewardTemplateId', templateId, { shouldValidate: true });
  };

  useEffect(() => {
    if (selectedType && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedType]);

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
              {REWARD_TYPES.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    handleTypeSelect(type);
                    console.log('클릭!');
                  }}
                  className={cn(
                    'text-body1-m h-14 cursor-pointer rounded-2xl border transition-all',
                    selectedType === type
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
            {selectedType === 'DATA' && (
              <DataReward value={rewardTemplateId} onSelect={handleValueSelect} />
            )}
            {selectedType === 'GIFTICON' && (
              <GifticonReward value={rewardTemplateId} onSelect={handleValueSelect} />
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
          disabled={!rewardTemplateId || rewardTemplateId === 0}
        >
          다음
        </Button>
      </footer>
    </div>
  );
};

export default Step3Reward;
