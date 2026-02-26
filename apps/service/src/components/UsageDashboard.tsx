'use client';

import { useSyncExternalStore } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { DaboIcon, MainBox, bytesToGB } from '@shared';
import { useGetFamilyUsage } from 'src/services/family/useGetFamilyUsage';
import { useSSE } from 'src/services/family/useUsageSSE';

import MonthNavigator from '@service/components/MonthNavigator';
import ProgressBar from '@service/components/ProgressBar';

import CustomerList from './CustomerList';
import UsageChart from './UsageChart';
import { ViewSegment } from './ViewSegment';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const UsageDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isClient = useIsClient();

  const now = new Date();
  const year = Number(searchParams.get('year')) || now.getFullYear();
  const month = Number(searchParams.get('month')) || now.getMonth() + 1;
  const viewMode = (searchParams.get('view') as 'list' | 'chart') || 'list';

  const { data: usageData, isLoading, isError } = useGetFamilyUsage(year, month);

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
  const { totalRealtime, memberRealtime } = useSSE(isCurrentMonth && isClient);

  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-body1-m">사용량 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError || !usageData?.customers) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-body1-m text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  const processedCustomers = usageData.customers.map((customer) => {
    if (memberRealtime && customer.customerId === memberRealtime.customerId) {
      return { ...customer, monthlyUsedBytes: memberRealtime.monthlyUsedBytes };
    }
    return customer;
  });

  const displayTotalUsedBytes =
    totalRealtime?.totalUsedBytes ??
    processedCustomers.reduce((acc, curr) => acc + curr.monthlyUsedBytes, 0);
  const displayTotalLimitBytes = totalRealtime?.totalLimitBytes ?? usageData.totalQuotaBytes;

  const totalUsageGB = bytesToGB(displayTotalUsedBytes);
  const totalLimitGB = bytesToGB(displayTotalLimitBytes);
  const usagePercent =
    displayTotalLimitBytes === 0
      ? 0
      : Math.min(Math.round((displayTotalUsedBytes / displayTotalLimitBytes) * 100), 100);

  const displayDate = `${year}년 ${month}월`;

  const updateUrl = (nextYear: number, nextMonth: number, nextView: 'list' | 'chart') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('year', nextYear.toString());
    params.set('month', nextMonth.toString());
    params.set('view', nextView);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePrevMonth = () => {
    let newYear = year;
    let newMonth = month - 1;
    if (newMonth < 1) {
      newYear -= 1;
      newMonth = 12;
    }
    updateUrl(newYear, newMonth, viewMode);
  };

  const handleNextMonth = () => {
    let newYear = year;
    let newMonth = month + 1;
    if (newMonth > 12) {
      newYear += 1;
      newMonth = 1;
    }
    updateUrl(newYear, newMonth, viewMode);
  };

  const handleModeChange = (mode: 'list' | 'chart') => {
    if (viewMode !== mode) {
      updateUrl(year, month, mode);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 px-5 pt-15">
      <MainBox className="w-full rounded-2xl p-5">
        <div className="flex flex-col gap-2">
          <span className="text-body1-m text-brand-dark">현재 데이터 사용량</span>
          <div className="flex items-baseline gap-2">
            <span className="text-main-m text-4xl font-bold">{totalUsageGB}GB</span>
            <span className="text-body2-m text-gray-600">/ {totalLimitGB}GB</span>
          </div>
        </div>
        <DaboIcon usage={usagePercent} className="-mt-35 -mr-2 ml-auto block" />
        <div className="mt-6">
          <ProgressBar value={usagePercent} className="h-4" />
        </div>
      </MainBox>

      <div className="flex flex-col items-center gap-4">
        <MonthNavigator
          currentDateText={displayDate}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        <div className="flex h-8 w-full items-center rounded-full">
          <ViewSegment viewMode={viewMode} onModeChange={handleModeChange} />
        </div>
      </div>

      <MainBox className="m-auto w-full rounded-2xl p-5">
        {processedCustomers.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            <p>등록된 가족 구성원이 없어요.</p>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <CustomerList customers={processedCustomers} />
            ) : (
              <div className="mx-auto aspect-square w-full max-w-70">
                <UsageChart customers={processedCustomers} totalUsageGB={totalUsageGB} />
              </div>
            )}
          </>
        )}
      </MainBox>
    </div>
  );
};

export default UsageDashboard;
