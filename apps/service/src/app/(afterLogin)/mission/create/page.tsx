'use client';

import { Suspense } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { MissionCreate, MissionCreateSchema } from 'src/api/mission/schema';
import Step1Title from 'src/components/mission/Step1Title';
import Step2Target from 'src/components/mission/Step2Target';
import Step3Reward from 'src/components/mission/Step3Reward';
import Step4Check from 'src/components/mission/Step4Check';

function MissionCreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = Number(searchParams.get('step')) || 1;

  const methods = useForm<MissionCreate>({
    resolver: zodResolver(MissionCreateSchema),
    mode: 'onChange',
  });
  const { setValue } = methods;

  const setStep = (step: number) => {
    router.push(`?step=${step}`);
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setValue('targetCustomerId', 0);
      setValue('targetName', '');
    }

    if (currentStep === 3) {
      setValue('rewardTemplateId', 0);
      setValue('rewardName', '');
    }

    setStep(currentStep - 1);
  };

  const nextStep = () => setStep(currentStep + 1);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col pb-24">
        <div className="flex-1 px-5 pt-10">
          {currentStep === 1 && <Step1Title nextStep={nextStep} />}
          {currentStep === 2 && <Step2Target prevStep={prevStep} nextStep={nextStep} />}
          {currentStep === 3 && <Step3Reward prevStep={prevStep} nextStep={nextStep} />}
          {currentStep === 4 && <Step4Check prevStep={prevStep} />}
        </div>
      </div>
    </FormProvider>
  );
}

export default function MissionCreatePage() {
  return (
    <Suspense fallback={<div className="p-5 text-center">로딩 중...</div>}>
      <MissionCreateForm />
    </Suspense>
  );
}
