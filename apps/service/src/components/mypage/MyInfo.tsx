'use client';

import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { EditIcon, NotificationIcon } from '@icons';
import { Box, Skeleton } from '@mui/material';
import { CURRENT_DATE, DaboIcon, Divider, Grade, bytesToGB, cn } from '@shared';

import { useUpdateFamilyName } from 'src/api/family/useUpdateFamilyName';
import { useGetMyPage } from 'src/api/mypage/useGetMypage';
import { usePushSubscription } from 'src/hooks/usePushSubscription';

import { Toggle } from '../common/Toggle';
import PolicySimple from '../policy/PolicySimple';
import PushConfirmModal from './PushConfirmModal';

const ProgressBar = dynamic(() => import('src/components/common/ProgressBar'), {
  ssr: false,
});

const MyInfoSkeleton = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={100} height={100} />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton variant="text" width="60px" height={24} />
          <Skeleton variant="circular" width={16} height={16} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="text" width="100px" height={40} />
          <Skeleton variant="rectangular" width={40} height={20} sx={{ borderRadius: '4px' }} />
        </div>
      </div>
    </div>

    {/* 데이터 사용량 영역 */}
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between">
        <Skeleton variant="text" width="80px" />
        <Skeleton variant="text" width="100px" />
      </div>
      <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: '4px' }} />
    </div>

    <Divider />

    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="text" width="60px" />
      </div>
      <Skeleton variant="rectangular" width={40} height={24} sx={{ borderRadius: '12px' }} />
    </div>

    <Divider />

    <Box className="flex flex-col gap-4">
      <Skeleton variant="rectangular" height={50} sx={{ borderRadius: '8px' }} />
      <Skeleton variant="rectangular" height={50} sx={{ borderRadius: '8px' }} />
      <Skeleton variant="rectangular" height={50} sx={{ borderRadius: '8px' }} />
    </Box>
  </div>
);

const MyInfo = () => {
  const { data: myPageData, isLoading } = useGetMyPage(CURRENT_DATE.YEAR, CURRENT_DATE.MONTH);
  const { mutate: updateFamilyName } = useUpdateFamilyName();
  const { subscribe, unsubscribe } = usePushSubscription();

  const [familyName, setFamilyName] = useState('');
  const [inputWidth, setInputWidth] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const isGranted = Notification.permission === 'granted';
      setTimeout(() => setIsPushEnabled(isGranted), 0);
    }
  }, []);

  const [isInitialized, setIsInitialized] = useState(false);
  if (myPageData?.familyName && !isInitialized) {
    setFamilyName(myPageData.familyName);
    setIsInitialized(true);
  }

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [familyName]);

  if (isLoading) return <MyInfoSkeleton />;
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

  const handlePushToggle = async () => {
    if (isPushEnabled) {
      setIsModalOpen(true);
    } else {
      await subscribe();
      if (Notification.permission === 'granted') {
        setIsPushEnabled(true);
      }
    }
  };

  const handleConfirmUnsubscribe = async () => {
    await unsubscribe();
    setIsPushEnabled(false);
    setIsModalOpen(false);
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (familyName !== myPageData.familyName && familyName.trim() !== '') {
      updateFamilyName(familyName);
    } else if (familyName.trim() === '') {
      setFamilyName(myPageData.familyName);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <DaboIcon usage={displayStatus} type={!limitGB ? 'smile' : undefined} width={100} />
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
            <Grade grade="VIP" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-caption-m">내 데이터 사용량</span>
          <span className="text-caption-m">
            {Math.round(usedGB)}GB / {limitGB ? `${limitGB}GB` : '무제한'}
          </span>
        </div>
        <ProgressBar value={usagePercent} />
      </div>
      <Divider />

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <NotificationIcon sx={{ width: 16 }} className="text-primary-500" />
          <span className="text-body1-m">푸시 알림</span>
        </div>
        <Toggle isChecked={isPushEnabled} onToggle={handlePushToggle} />
      </div>

      <Divider />

      <PolicySimple>
        <PolicySimple.Block isBlocked={myPageData.isBlocked} type="text" />
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

      <PushConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmUnsubscribe}
      />
    </>
  );
};

export default MyInfo;
