'use client';

import { useFormContext } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button, MainBox } from '@shared';

import { MissionCreate } from 'src/api/mission/schema';
import { useCreateMission } from 'src/api/mission/useCreateMission';

const Step4Check = ({ prevStep }: { prevStep: () => void }) => {
  const router = useRouter();

  const { getValues, reset } = useFormContext<MissionCreate>();
  const { missionText, targetName, rewardName } = getValues();

  const { mutate: createMission, isPending } = useCreateMission();

  const handleSave = async () => {
    const finalData = getValues();

    createMission(finalData, {
      onSuccess: () => {
        reset();
        router.push('/mission');
      },
      onError: (error) => {
        console.error('미션 생성 실패:', error);
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10 pt-10">
        <header className="flex flex-col gap-2">
          <h2 className="text-h2-m">미션 내용과 보상을 확인해 주세요.</h2>
          <p className="text-body2-m text-gray-700">생성된 미션은 수정이나 삭제가 불가능합니다.</p>
        </header>

        <MainBox className="flex justify-center rounded-2xl border-gray-200 p-4 text-center">
          <p className="text-body1-m leading-loose">
            {missionText} 완료 시 <br />
            {targetName || '가족'} 님에게 <br />
            <span className="text-primary font-bold">{rewardName || '선택한 보상'}</span>
            을(를) 제공합니다.
          </p>
        </MainBox>
      </div>

      <footer className="fixed right-0 bottom-25 left-0 mx-5 flex gap-2">
        <Button size="lg" color="light" isFullWidth onClick={prevStep} disabled={isPending}>
          이전
        </Button>
        <Button size="lg" color="primary" isFullWidth onClick={handleSave} disabled={isPending}>
          {isPending ? '미션 생성 중...' : '미션 생성하기'}
        </Button>
      </footer>
    </div>
  );
};

export default Step4Check;
