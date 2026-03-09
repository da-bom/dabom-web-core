'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, DropDown } from '@shared';

export default function ObjectionPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('데이터 한도');

  const options = ['데이터 한도', '긴급 요청'];

  return (
    <main className="mx-auto mt-27.5 flex w-full flex-col items-center px-5">
      <section className="flex w-full flex-col items-start gap-7">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">어떤 정책에 대한 이의제기인가요?</h1>
          <p className="text-body2-m text-gray-700">description</p>
        </div>

        <div className="flex w-full flex-row items-center">
          <DropDown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            className="h-12 w-full rounded-2xl border border-gray-200 bg-white"
            size="lg"
          />
        </div>
      </section>

      <div className="fixed bottom-24 left-0 flex w-full justify-center px-5">
        <Button
          size="lg"
          color="dark"
          onClick={() => {
            // 이의제기 생성 API 호출 로직 추가 예정
            router.push('/appeal');
          }}
        >
          다음
        </Button>
      </div>
    </main>
  );
}
