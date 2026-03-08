'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, DropDown } from '@shared';

export default function ObjectionPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('데이터 한도 제한');

  // 예시 옵션 데이터
  const options = ['데이터 한도 제한', '긴급 요청'];

  return (
    <main className="mx-auto mt-39.5 flex w-full flex-col items-center px-5">
      <section className="flex w-full flex-col items-start gap-7">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">어떤 정책에 대한 이의제기인가요?</h1>
          <p className="text-body2-m text-gray-700">description</p>
        </div>

        {/* 입력 및 선택 영역 */}
        <div className="flex w-full flex-row items-center">
          {/* 공유 컴포넌트인 DropDown 사용 */}
          <DropDown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            className="h-[48px] w-full rounded-2xl border border-[#DEDEDE] bg-white"
            size="lg"
          />
        </div>
      </section>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-24 left-0 flex w-full justify-center px-5">
        <Button
          size="lg"
          color="dark"
          onClick={() => router.push(`/appeal/chat?policy=${encodeURIComponent(selectedOption)}`)}
        >
          다음
        </Button>
      </div>
    </main>
  );
}
