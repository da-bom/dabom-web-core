import { Button, MainBox } from '@shared';

const Step4Check = ({ prevStep }: { prevStep: () => void }) => {
  const handleSave = () => {
    // API 연동
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10 pt-10">
        <header className="flex flex-col gap-2">
          <h2 className="text-h2-m">미션 내용과 보상을 확인해 주세요.</h2>
          <p className="text-body2-m text-gray-700">생성된 미션은 삭제할 수 없습니다.</p>
        </header>

        <MainBox className="flex justify-center rounded-2xl p-4 text-center">
          <span>
            미션 이름 완료 시 <br />
            보상 내용 제공
          </span>
        </MainBox>
      </div>

      <footer className="fixed right-0 bottom-30 left-0 mx-5 flex gap-2">
        <Button size="lg" color="light" isFullWidth onClick={prevStep}>
          이전
        </Button>
        <Button size="lg" color="primary" isFullWidth onClick={handleSave}>
          완료
        </Button>
      </footer>
    </div>
  );
};

export default Step4Check;
