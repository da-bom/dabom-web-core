'use client';

import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { EditIcon } from '@icons';
import { DaboIcon, Divider, Grade, bytesToGB, cn } from '@shared';

import { useGetMyPage } from 'src/api/mypage/useGetMypage';

import PolicySimple from '../policy/PolicySimple';

const ProgressBar = dynamic(() => import('src/components/common/ProgressBar'), {
  ssr: false,
});

const MyInfo = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const { data: myPageData, isLoading } = useGetMyPage(currentYear, currentMonth);

  const [familyName, setFamilyName] = useState('');
  const [inputWidth, setInputWidth] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  if (myPageData?.familyName && !isInitialized && !isEditing) {
    setFamilyName(myPageData.familyName);
    setIsInitialized(true);
  }

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [familyName]);

  if (isLoading) return <div>로딩</div>;
  if (!myPageData) return null;

  const usedGB = bytesToGB(myPageData.monthlyUsedBytes);
  const limitGB = myPageData.monthlyLimitBytes ? bytesToGB(myPageData.monthlyLimitBytes) : null;

  const usagePercent = limitGB ? Math.min(Math.round((usedGB / limitGB) * 100), 100) : 0;
  const displayStatus = 100 - usagePercent;

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
    <>
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
                className={cn(
                  'text-body1-m bg-transparent p-0 transition-all outline-none focus:ring-0',
                  isEditing ? 'border-b border-gray-400' : 'border-none',
                )}
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
          <div className="flex gap-1">
            <span className="text-h2-m">{myPageData.name}</span>
            <Grade grade="NORMAL" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-caption-m">내 데이터 사용량</span>
          <span className="text-caption-m">
            {usedGB.toFixed(1)}GB / {limitGB ? `${limitGB}GB` : '무제한'}
          </span>
        </div>
        <ProgressBar value={usagePercent} />
      </div>
      <Divider />

      <PolicySimple>
        <PolicySimple.Block isBlocked={myPageData.isBlocked} />
        <PolicySimple.Limit text={limitGB ? `${limitGB}GB` : '무제한'} disabled={!limitGB} />
        <PolicySimple.Time
          text={
            myPageData.timeBlock?.start
              ? `${myPageData.timeBlock.start}~${myPageData.timeBlock.end}`
              : '-'
          }
          isOn={!!myPageData.timeBlock?.start}
          disabled={!myPageData.timeBlock?.start}
        />
      </PolicySimple>
    </>
  );
};

export default MyInfo;
