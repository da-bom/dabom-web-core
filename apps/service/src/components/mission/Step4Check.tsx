import { useFormContext } from 'react-hook-form';

import { Button, MainBox } from '@shared';

import { MissionCreate } from 'src/api/mission/schema';

const Step4Check = ({ prevStep }: { prevStep: () => void }) => {
  const { getValues } = useFormContext<MissionCreate>();
  const { missionText, targetCustomerId, rewardTemplateId } = getValues();

  const handleSave = async () => {
    const finalData = getValues();
    console.log('서버로 전송할 데이터:', finalData);
    // TODO: API 연동
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10 pt-10">
        <header className="flex flex-col gap-2">
          <h2 className="text-h2-m">미션 내용과 보상을 확인해 주세요.</h2>
          <p className="text-body2-m text-gray-700">생성된 미션은 수정이나 삭제가 불가능합니다.</p>
        </header>

        <MainBox className="flex justify-center rounded-2xl border-gray-200 p-4 text-center">
          <p className="text-body1-m">
            {missionText} 완료 시 <br />
            {targetCustomerId} 에게 <br />
            <span className="text-primary">{rewardTemplateId ? rewardTemplateId : '보상'}</span>
            을(를) 지급합니다.
          </p>
        </MainBox>
      </div>

      <footer className="fixed right-0 bottom-25 left-0 mx-5 flex gap-2">
        <Button size="lg" color="light" isFullWidth onClick={prevStep}>
          이전
        </Button>
        <Button size="lg" color="primary" isFullWidth onClick={handleSave}>
          미션 생성하기
        </Button>
      </footer>
    </div>
  );
};

export default Step4Check;
