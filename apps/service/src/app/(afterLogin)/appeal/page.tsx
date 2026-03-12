'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { Button, formatSize } from '@shared';

import { useGetAppeals } from 'src/api/appeal/useGetAppeals';
import { AppealRequestCard, AppealStatus, FilterSegment } from 'src/components/appeal';
import { APPEAL_TYPE_LABEL } from 'src/constants/appeal';
import { getCurrentUserRole } from 'src/utils/auth';

const AppealPageContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'progress' | 'completed'>('progress');

  const { data, isLoading, isError } = useGetAppeals();

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

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
        <Button size="md" color="light" onClick={() => window.location.reload()}>
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
    <div className="flex h-full flex-col px-5 py-5">
      <div className="flex flex-col gap-5">
        <FilterSegment activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-col gap-2">
          {filteredItems.map((item) => {
            const rawLimitBytes = item.desiredRules?.limitBytes;
            const startTime = item.desiredRules?.start;
            const endTime = item.desiredRules?.end;

            let displayValue = '';
            const numLimitBytes = rawLimitBytes !== null ? Number(rawLimitBytes) : NaN;

            if (!isNaN(numLimitBytes)) {
              const { total } = formatSize(numLimitBytes);
              displayValue = total;
            } else if (startTime && endTime) {
              displayValue = `${startTime} ~ ${endTime}`;
            }

            let policyLabel: string = APPEAL_TYPE_LABEL.NORMAL;
            if (item.type === 'EMERGENCY') {
              policyLabel = APPEAL_TYPE_LABEL.EMERGENCY;
            } else if (startTime || endTime) {
              policyLabel = APPEAL_TYPE_LABEL.TIME_BLOCK;
            }

            let uiStatus: AppealStatus = item.status.toLowerCase() as AppealStatus;
            if (item.type === 'EMERGENCY') uiStatus = 'emergency';

            return (
              <AppealRequestCard
                key={item.appealId}
                policyType={policyLabel}
                dataLimit={displayValue}
                reason={item.requestReason}
                status={uiStatus}
                requesterName={isOwner ? item.requesterName : undefined}
                onClick={() => {
                  router.push(
                    `/appeal/comment?policy=${encodeURIComponent(policyLabel)}&id=${item.appealId}&status=${item.status}`,
                  );
                }}
              />
            );
          })}
        </div>
      </div>

      {!isOwner && (
        <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
          <Button size="md-short" color="light" onClick={() => router.back()}>
            이전
          </Button>
          <Button size="lg" color="dark" onClick={() => router.push('/appeal/objection')}>
            다음
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
