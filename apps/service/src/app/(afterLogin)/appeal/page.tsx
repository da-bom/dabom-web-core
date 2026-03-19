'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { Button, formatSize } from '@shared';

import { useGetAppeals } from 'src/api/appeal/useGetAppeals';
import { useCustomerMe } from 'src/api/auth/useCustomerMe';
import { AppealRequestCard, AppealStatus, FilterSegment } from 'src/components/appeal';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserRole } from 'src/utils/auth';

const AppealPageContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'progress' | 'completed'>('progress');

  const { data, isLoading, isError, refetch } = useGetAppeals();

  const { data: user } = useCustomerMe();
  const isOwner = user?.role === 'OWNER';

  if (isLoading) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center">
        <p className="text-body1-m">이의제기 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center p-8 text-center">
        <p className="text-h2-m mb-4">목록을 불러오는 중 오류가 발생했습니다.</p>
        <Button size="md" color="light" onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  const filteredItems = data.appeals.filter((item) => {
    if (activeTab === 'progress') return item.status === 'PENDING';
    if (activeTab === 'completed') return item.status !== 'PENDING';
    return true;
  });

  return (
    <div className="flex min-h-full flex-col px-5 pt-5 pb-30">
      <div className="flex flex-col gap-5">
        <FilterSegment activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-col gap-2">
          {filteredItems.map((item) => {
            const displayValue =
              item.type === 'EMERGENCY'
                ? APPEAL_UI_TEXT.EMERGENCY_DATA_AMOUNT
                : item.desiredRules?.limitBytes
                  ? formatSize(item.desiredRules.limitBytes).total
                  : item.desiredRules?.startTime
                    ? `${item.desiredRules.startTime} ~ ${item.desiredRules.endTime}`
                    : item.policyType === 'MANUAL_BLOCK'
                      ? APPEAL_UI_TEXT.MANUAL_BLOCK
                      : item.policyType === 'APP_BLOCK'
                        ? APPEAL_UI_TEXT.APP_BLOCK
                        : '-';

            const policyType =
              item.type === 'EMERGENCY'
                ? APPEAL_TYPE_LABEL.EMERGENCY
                : item.policyType === 'MANUAL_BLOCK'
                  ? APPEAL_TYPE_LABEL.MANUAL_BLOCK
                  : item.policyType === 'APP_BLOCK'
                    ? APPEAL_TYPE_LABEL.APP_BLOCK
                    : item.desiredRules?.startTime
                      ? APPEAL_TYPE_LABEL.TIME_BLOCK
                      : APPEAL_TYPE_LABEL.NORMAL;

            const uiStatus = (
              item.type === 'EMERGENCY' ? 'emergency' : item.status.toLowerCase()
            ) as AppealStatus;

            return (
              <AppealRequestCard
                key={item.appealId}
                policyType={policyType}
                dataLimit={displayValue}
                reason={item.requestReason}
                status={uiStatus}
                requesterName={isOwner ? item.requesterName : undefined}
                onClick={() => {
                  router.push(
                    `/appeal/comment/${item.appealId}?policy=${encodeURIComponent(policyType)}&status=${item.status}`,
                  );
                }}
              />
            );
          })}
        </div>
      </div>

      {!isOwner && (
        <div className="from-background-base via-background-base pointer-events-none fixed right-0 bottom-16 left-0 z-10 bg-gradient-to-t to-transparent px-5 pt-10 pb-8">
          <Button
            size="lg"
            color="dark"
            isFullWidth
            onClick={() => router.push('/appeal/objection')}
          >
            이의 제기 하기
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
