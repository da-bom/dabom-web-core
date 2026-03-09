import { useFormContext } from 'react-hook-form';

import { Button, cn } from '@shared';

import { MissionForm } from 'src/api/mission/schema';

const MEMBER = [
  { id: 1, name: '김민지' },
  { id: 2, name: '김민수' },
  { id: 3, name: '김길동' },
];

const Step2Target = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const { setValue, watch } = useFormContext<MissionForm>();

  const selectedId = watch('targetId');

  const handleSelect = (id: number) => {
    setValue('targetId', id, { shouldValidate: true });
  };

  return (
    <div className="mt-10 flex flex-col justify-between">
      <div className="flex flex-col gap-7">
        <header className="flex flex-col gap-2">
          <h2 className="text-h2-m">누구의 미션을 만들어볼까요?</h2>
          <p className="text-body2-m text-gray-700">미션의 대상을 선택해 주세요.</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {MEMBER.map((member) => {
            const isSelected = selectedId === member.id;

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => handleSelect(member.id)}
                className={cn(
                  'h-14 rounded-2xl border transition-all',
                  isSelected
                    ? 'bg-primary-100 text-brand-dark border-gray-500'
                    : 'border-gray-200 bg-white text-gray-700',
                )}
              >
                {member.name}
              </button>
            );
          })}
        </div>
      </div>

      <footer className="fixed right-0 bottom-25 left-0 mx-5 flex gap-2">
        <Button size="lg" color="light" isFullWidth onClick={prevStep}>
          이전
        </Button>
        <Button size="lg" color="dark" isFullWidth onClick={nextStep} disabled={!selectedId}>
          다음
        </Button>
      </footer>
    </div>
  );
};

export default Step2Target;
