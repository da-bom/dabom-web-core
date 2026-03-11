'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, DropDown, MainBox } from '@shared';

import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';

export default function ObjectionPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(APPEAL_TYPE_LABEL.NORMAL);

  const options = Object.values(APPEAL_TYPE_LABEL);

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
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            size="sm"
            className="w-full"
          />
        </MainBox>
      </section>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="white" onClick={() => router.back()}>
          이전
        </Button>
        <Button
          size="lg"
          color="dark"
          onClick={() => {
            if (selectedOption === APPEAL_TYPE_LABEL.NORMAL) {
              router.push('/appeal/create/data');
            } else if (selectedOption === APPEAL_TYPE_LABEL.TIME_BLOCK) {
              router.push('/appeal/create/time');
            } else {
              router.push('/appeal');
            }
          }}
        >
          다음
        </Button>
      </div>
    </main>
  );
}
