'use client';

import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { ChevronIcon, DaboIcon, EditIcon, MainBox, cn } from '@shared';

const ProgressBar = dynamic(() => import('@service/components/common/ProgressBar'), {
  ssr: false,
});

const data = {
  name: '김철수',
  familyName: '김씨네 가족',
  usedGB: 30,
  limitGB: 100,
};

const MyPage = () => {
  const [familyName, setFamilyName] = useState(data.familyName);
  const [inputWidth, setInputWidth] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const usagePercent = Math.min(Math.round((data.usedGB / data.limitGB) * 100), 100);
  const displayStatus = 100 - usagePercent;

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [familyName]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="mx-5 mt-14 flex flex-col gap-4">
      <MainBox className="flex w-full flex-col gap-7 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-4">
          <DaboIcon usage={displayStatus} width={100} />
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="relative flex items-center">
                <span
                  ref={spanRef}
                  className="text-body1-m invisible absolute whitespace-pre"
                  aria-hidden="true"
                >
                  {familyName || ''}
                </span>

                <input
                  ref={inputRef}
                  className={`text-body1-m bg-transparent p-0 transition-all outline-none focus:ring-0 ${
                    isEditing ? 'border-b border-gray-400' : 'border-none'
                  }`}
                  style={{ width: `${inputWidth}px`, minWidth: '20px' }}
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
                  readOnly={!isEditing}
                />
              </div>
              <button onClick={handleEditClick} type="button" className="flex items-center">
                <EditIcon
                  className={cn('cursor-pointer', isEditing ? 'text-primary' : 'text-gray-500')}
                  sx={{ width: 16 }}
                />
              </button>
            </div>
            <span className="text-h2-m">{data.name}</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-caption-m">내 데이터 사용량</span>
            <span className="text-caption-m">
              {data.usedGB}GB / {data.limitGB}GB
            </span>
          </div>
          <ProgressBar value={usagePercent} />
        </div>
        <div className="border-t border-gray-100" />
      </MainBox>

      <MainBox className="flex h-14 cursor-pointer items-center justify-between rounded-2xl px-4">
        <span>내가 받은 보상 보기</span>
        <ChevronIcon className="text-gray-800" sx={{ width: 16 }} />
      </MainBox>
      <MainBox className="flex h-14 cursor-pointer items-center justify-between rounded-2xl px-4">
        <span>이용 약관</span>
        <ChevronIcon className="text-gray-800" sx={{ width: 16 }} />
      </MainBox>
      <footer className="text-body2-m ml-2 flex flex-col items-start gap-1 text-gray-800 underline">
        <button>로그아웃</button>
      </footer>
    </div>
  );
};

export default MyPage;
