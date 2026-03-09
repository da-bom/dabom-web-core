import { useState } from 'react';

import { Button } from '@shared';

const MEMBER = [
  { id: 1, name: '김민지' },
  { id: 2, name: '김민수' },
  { id: 3, name: '김길동' },
];

const Step2Target = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="mt-30 flex flex-col gap-7">
        <p className="flex flex-col gap-2">
          <span className="text-h2-m">누구의 미션을 만들어볼까요?</span>
          <span className="text-body2-m text-gray-700">미션의 대상을 선택해 주세요.</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          {MEMBER.map((member) => {
            const isSelected = selectedId === member.id;

            return (
              <button
                key={member.id}
                onClick={() => setSelectedId(member.id)}
                className={`h-14 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-primary-100 border-gray-500 text-gray-800'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {member.name}
              </button>
            );
          })}
        </div>
      </div>

      <footer className="w-fill flex gap-2">
        <Button size="lg" color="light" onClick={prevStep}>
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
