'use client';

import { Suspense } from 'react';

import { ResetIcon } from '@icons';
import { MainBox } from '@shared';
import dayjs from 'dayjs';

import { useGetDashboard } from 'src/api/dashboard/useGetDashboard';
import Loading from 'src/components/common/Loading';
import HealthStatusCard from 'src/components/dashboard/HealthStatusCard';
import SummaryCard from 'src/components/dashboard/SummaryCard';
import TpsStatusCard from 'src/components/dashboard/TpsStatusCard';

const DashboardContent = () => {
  const { data, refetch } = useGetDashboard();

  return (
    <div className="flex h-[calc(100vh-110px)] flex-col gap-4">
      <div className="flex w-full items-center justify-end gap-1 text-gray-800">
        <button
          onClick={() => refetch()}
          className="hover:text-brand-primary flex items-center gap-1 transition-colors"
        >
          <ResetIcon sx={{ width: 16, height: 16 }} />
          <span className="text-body3-d">
            마지막 업데이트: {dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </button>
      </div>

      <div className="flex w-full gap-4">
        <TpsStatusCard
          value={data.currentTps}
          lastUpdate={dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}
        />
        <HealthStatusCard systemHealth={data.systemHealth} />
      </div>

      <div className="flex w-full gap-4">
        <SummaryCard
          title="가족"
          value={data.totalFamilies}
          subValue={data.activeFamilies}
          label="활성:"
        />
        <SummaryCard
          title="유저"
          value={data.totalUsers}
          subValue={data.blockedUsers}
          label="차단:"
        />
        <SummaryCard title="오늘의 이벤트" value={data.todayEvents} />
      </div>

      <div className="flex h-full w-full gap-4 overflow-hidden">
        <MainBox className="flex w-full flex-col items-center gap-4 p-5">
          <span className="text-body1-d font-bold">실시간 처리량(TPS)</span>
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-50">
            <span className="text-gray-400 italic">Chart Visualizing TPS: {data.currentTps}</span>
          </div>
        </MainBox>

        <MainBox className="flex w-full flex-col items-center gap-4 overflow-hidden px-10 py-5">
          <span className="text-body1-d font-bold">최근 차단 내역</span>
          <div className="flex w-full flex-col gap-4 overflow-y-auto pr-2">
            {data.recentBlocks.length > 0 ? (
              data.recentBlocks.map((item) => (
                <MainBox
                  key={`${item.familyId}-${item.customerId}-${item.blockedAt}`}
                  className="hover:border-brand-primary/50 flex w-full flex-col gap-2 border-gray-200 p-4 transition-colors"
                >
                  <span className="text-body2-d font-medium">
                    <span className="text-brand-primary font-bold">FAM-{item.familyId}</span>의{' '}
                    {item.customerId}번 유저 차단
                  </span>
                  <div className="text-body3-d flex items-center justify-between">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700">
                      사유: {item.reason}
                    </span>
                    <span className="text-xs text-gray-400">
                      {dayjs(item.blockedAt).format('MM-DD HH:mm')}
                    </span>
                  </div>
                </MainBox>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                최근 차단 내역이 없습니다.
              </div>
            )}
          </div>
        </MainBox>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
};

export default DashboardPage;
