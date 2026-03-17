'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, DropDown, MainBox } from '@shared';

import { useGetObjectionPolicies } from 'src/api/appeal/useGetObjectionPolicies';
import { APPEAL_UI_TEXT } from 'src/constants/appeal';

export default function ObjectionPage() {
  const router = useRouter();
  const { data } = useGetObjectionPolicies();
  const [isOpen, setIsOpen] = useState(false);
  const [userSelectedOption, setUserSelectedOption] = useState<string>('');

  const policies = data?.policies || [];
  const options = policies.map((p) => p.policyName);

  const currentOption = userSelectedOption || options[0] || '';

  const handleNext = () => {
    const selectedPolicy = policies.find((p) => p.policyName === currentOption);
    if (!selectedPolicy) return;

    if (selectedPolicy.policyType === 'MONTHLY_LIMIT') {
      router.push(`/appeal/create/data?id=${selectedPolicy.policyAssignmentId}`);
    } else if (selectedPolicy.policyType === 'TIME_BLOCK') {
      router.push(`/appeal/create/time?id=${selectedPolicy.policyAssignmentId}`);
    } else if (selectedPolicy.policyType === 'MANUAL_BLOCK') {
      router.push(`/appeal/create/reason?id=${selectedPolicy.policyAssignmentId}`);
    } else {
      router.push('/appeal');
    }
  };

  return (
    <main className="mx-auto mt-20 flex w-full flex-col items-center px-5">
      <section className="flex w-full flex-col items-start gap-7">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">{APPEAL_UI_TEXT.OBJECTION_TITLE}</h1>
          <p className="text-body2-m text-gray-700">{APPEAL_UI_TEXT.OBJECTION_DESCRIPTION}</p>
        </div>

        <MainBox className="bg-brand-white flex w-full flex-col gap-4 rounded-2xl border-gray-200">
          <DropDown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            options={options}
            selectedOption={currentOption}
            setSelectedOption={setUserSelectedOption}
            size="sm"
            className="w-full"
          />
        </MainBox>
      </section>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="white" onClick={() => router.back()}>
          이전
        </Button>
        <Button size="lg" color="dark" onClick={handleNext} disabled={!currentOption}>
          다음
        </Button>
      </div>
    </main>
  );
}
