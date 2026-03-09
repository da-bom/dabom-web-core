'use client';
import { useState } from 'react';

import { MissionForm } from 'src/api/mission/schema';
import Step1Ttile from 'src/components/mission/Step1Title';
import Step2Target from 'src/components/mission/Step2Target';
import Step3Reward from 'src/components/mission/Step3Reward';

export default function MissionCreatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MissionForm>>({});

  const prevStep = () => setStep((prev) => prev - 1);
  const nextStep = () => setStep((prev) => prev + 1);

  // const nextStep = (data: Partial<MissionForm>) => {
  //   setFormData((prev) => ({ ...prev, ...data }));
  //   setStep((prev) => prev + 1);
  // };

  return (
    <div className="flex flex-col pb-24">
      <div className="flex-1 px-5 pt-10">
        {step === 1 && <Step1Ttile nextStep={nextStep} />}
        {step === 2 && <Step2Target prevStep={prevStep} nextStep={nextStep} />}
        {step === 3 && <Step3Reward prevStep={prevStep} nextStep={nextStep} />}
      </div>
    </div>
  );
}
