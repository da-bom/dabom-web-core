import { useFormContext } from 'react-hook-form';

import { Button, Input } from '@shared';

import { MissionForm } from 'src/api/mission/schema';

const Step1Title = ({ nextStep }: { nextStep: () => void }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<MissionForm>();

  const titleValue = watch('title');

  return (
    <div className="relative mt-10 flex flex-col overflow-hidden">
      <div className="flex flex-col gap-7">
        <p className="flex flex-col gap-2">
          <span className="text-h2-m">미션을 입력하세요.</span>
          <span className="text-body2-m text-gray-700">최대 20자까지 입력 가능합니다.</span>
        </p>

        <Input
          {...register('title')}
          value={titleValue || ''}
          type="text"
          placeholder="입력하세요."
          className="w-full"
          maxLength={20}
        />

        {errors.title && <span className="text-negative">{errors.title.message}</span>}
      </div>

      <footer className="fixed right-0 bottom-25 left-0 mx-5">
        <div className="mx-auto">
          <Button size="lg" color="dark" isFullWidth onClick={nextStep} disabled={!titleValue}>
            다음
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Step1Title;
