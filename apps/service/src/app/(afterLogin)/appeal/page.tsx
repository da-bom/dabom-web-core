'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import { Button, formatSize } from '@shared';

import { AppealRequestCard, AppealStatus, FilterSegment } from 'src/components/appeal';
import { APPEAL_TYPE_LABEL } from 'src/constants/appeal';
import { mockNegotiations } from 'src/data/negotiations';
import { getCurrentUserRole } from 'src/utils/auth';

const AppealPageContent = () => {
  const [activeTab, setActiveTab] = useState<'progress' | 'completed'>('progress');

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  const filteredItems = mockNegotiations.filter((item) => {
    if (activeTab === 'progress') return item.status === 'PENDING';
    if (activeTab === 'completed') return item.status !== 'PENDING';
    return true;
  });

  return (
    <div className="flex h-full flex-col px-5 py-5">
      <div className="flex flex-col gap-5">
        <FilterSegment activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-col gap-2 pb-24">
          {filteredItems.map((item) => {
            const { total: formattedSize } = formatSize(item.desiredRules.limitBytes);
            const policyType =
              item.type === 'EMERGENCY' ? APPEAL_TYPE_LABEL.EMERGENCY : APPEAL_TYPE_LABEL.NORMAL;
            let uiStatus: AppealStatus = item.status.toLowerCase() as AppealStatus;
            if (item.type === 'EMERGENCY') uiStatus = 'emergency';

            return (
              <AppealRequestCard
                key={item.appealId}
                policyType={policyType}
                dataLimit={formattedSize}
                reason={item.requestReason}
                status={uiStatus}
                requesterName={isOwner ? item.requesterName : undefined}
              />
            );
          })}
        </div>
      </div>

      {!isOwner && (
        <div className="fixed bottom-24 left-0 flex w-full justify-center px-5">
          <Button size="lg" color="dark">
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
