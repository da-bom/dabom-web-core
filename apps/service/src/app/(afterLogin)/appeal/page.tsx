'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { Button } from '@shared';

import { AppealRequestCard, AppealStatus, FilterSegment } from '@service/components/appeal';
import { getCurrentUserRole } from '@service/utils/auth';

interface AppealItem {
  policyType: string;
  dataLimit: string;
  reason: string;
  status: AppealStatus;
}

const progressItems: AppealItem[] = [
  {
    policyType: '데이터 한도',
    dataLimit: '10GB',
    reason: '인강 들어야 하는데 데이터가 부족해요.',
    status: 'pending',
  },
  {
    policyType: '긴급 요청',
    dataLimit: '',
    reason: '지금 당장 중요한 서류를 보내야 해요.',
    status: 'pending',
  },
];

const completedItems: AppealItem[] = [
  {
    policyType: '데이터 한도 제한',
    dataLimit: '10GB',
    reason: '인강 들어야 하는데 데이터가 부족해요.',
    status: 'rejected',
  },
  {
    policyType: '데이터 한도 제한',
    dataLimit: '5GB',
    reason: '인강 들어야 하는데 데이터가 부족해요. 인강 들어야 하...',
    status: 'approved',
  },
  {
    policyType: '긴급 요청',
    dataLimit: '',
    reason: '과제 제출해야하는데 데이터가 부족해요.',
    status: 'emergency',
  },
];

const AppealPageContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'progress' | 'completed'>('progress');

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';
  const items = activeTab === 'progress' ? progressItems : completedItems;

  return (
    <div className="flex h-full min-h-[calc(100vh-140px)] flex-col bg-[#F0F1F3] px-5 py-5">
      <div className="flex flex-col gap-5">
        <FilterSegment activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-col gap-2 pb-24">
          {items.map((item, index) => (
            <AppealRequestCard
              key={`${item.policyType}-${index}`}
              policyType={item.policyType}
              dataLimit={item.dataLimit}
              reason={item.reason}
              status={item.status}
              onClick={() => {
                router.push(`/appeal/chat?policy=${encodeURIComponent(item.policyType)}`);
              }}
            />
          ))}
        </div>
      </div>

      {isOwner && (
        <div className="fixed bottom-24 left-0 flex w-full justify-center px-5">
          <Button size="lg" color="dark" onClick={() => router.push('/appeal/objection')}>
            이의 제기하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(AppealPageContent), {
  ssr: false,
  loading: () => <div className="h-full min-h-screen" />,
});
