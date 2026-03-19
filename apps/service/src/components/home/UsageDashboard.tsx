'use client';

import { useSyncExternalStore } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box, Skeleton } from '@mui/material';
import { Button, DaboIcon, MainBox, bytesToGB } from '@shared';

import { useGetAppeals } from 'src/api/appeal/useGetAppeals';
import { useGetFamilyUsage, useGetFamilyUsageCurrent } from 'src/api/family/useGetFamilyUsage';
import { useSSE } from 'src/api/family/useUsageSSE';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserRole } from 'src/utils/auth';

import MonthNavigator from '../common/MonthNavigator';
import ProgressBar from '../common/ProgressBar';
import CustomerList from './CustomerList';
import UsageActionCards from './UsageActionCards';
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

const DashboardSkeleton = () => (
  <div className="mb-20 flex w-full flex-col items-center gap-7 p-5">
    <div className="relative h-38 w-full">
      <Box className="absolute bottom-0 left-0 flex w-full flex-col items-end gap-4 rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex w-42 flex-col items-start gap-2">
          <Skeleton variant="text" width="100px" height={20} />
          <div className="flex items-end gap-1">
            <Skeleton variant="text" width="60px" height={40} />
          </div>
        </div>
        <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: '4px' }} />
      </Box>
      <div className="absolute -top-5 left-5 z-10">
        <Skeleton variant="circular" width={130} height={130} animation="wave" />
      </div>
    </div>

    <div className="flex w-full gap-3">
      {[1, 2].map((i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          width="100%"
          height={100}
          sx={{ borderRadius: '16px' }}
        />
      ))}
    </div>

    <div className="flex w-full items-center justify-center gap-6">
      <Skeleton variant="rectangular" width={200} height={30} sx={{ borderRadius: '12px' }} />
    </div>

    <div className="flex w-full flex-col gap-4">
      <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: '12px' }} />
      <Box className="flex w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex flex-col gap-1">
                <Skeleton variant="text" width="60px" />
                <Skeleton variant="text" width="40px" />
              </div>
            </div>
            <Skeleton variant="text" width="80px" />
          </div>
        ))}
      </Box>
    </div>
  </div>
);

const UsageDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isClient = useIsClient();

  const now = new Date();
  const year = Number(searchParams.get('year')) || now.getFullYear();
  const month = Number(searchParams.get('month')) || now.getMonth() + 1;
  const viewMode = (searchParams.get('view') as 'list' | 'chart') || 'list';

  const { data: usageData, isLoading: isMonthlyLoading, isError } = useGetFamilyUsage(year, month);
  const { data: currentData, isLoading: isCurrentLoading } = useGetFamilyUsageCurrent();
  const { data: appealData } = useGetAppeals(undefined, undefined, 100);

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
  const { totalRealtime, memberRealtime } = useSSE(isCurrentMonth && isClient);

  if (!isClient || isMonthlyLoading || (isCurrentMonth && isCurrentLoading)) {
    return <DashboardSkeleton />;
  }

  if (isError || !usageData?.customers) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-5 text-center">
        <p className="text-body1-m mb-4 text-red-500">데이터를 불러오는데 실패했습니다.</p>
        <Button size="md" color="light" onClick={() => window.location.reload()}>
          다시 시도
        </Button>
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
    (isCurrentMonth ? currentData?.totalUsedBytes : null) ??
    processedCustomers.reduce((acc, curr) => acc + curr.monthlyUsedBytes, 0);

  const displayTotalLimitBytes =
    totalRealtime?.totalQuotaBytes ??
    (isCurrentMonth ? currentData?.totalQuotaBytes : null) ??
    usageData.totalQuotaBytes;

  const totalUsageGB = Math.floor(bytesToGB(displayTotalUsedBytes));
  const totalLimitGB =
    displayTotalLimitBytes && displayTotalLimitBytes > 0
      ? Math.floor(bytesToGB(displayTotalLimitBytes))
      : null;
  const usagePercent = !displayTotalLimitBytes
    ? 0
    : Math.min(Math.round((displayTotalUsedBytes / displayTotalLimitBytes) * 100), 100);

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
    if (viewMode !== mode) updateUrl(year, month, mode);
  };

  const userRole = getCurrentUserRole();
  const isMember = userRole === 'MEMBER';

  const isEmergencyUsed =
    appealData?.appeals.some((appeal) => {
      const appealDate = new Date(appeal.createdAt);
      return (
        appeal.type === 'EMERGENCY' &&
        appeal.status !== 'CANCELLED' &&
        appealDate.getFullYear() === year &&
        appealDate.getMonth() + 1 === month
      );
    }) ?? false;

  return (
    <div className="mb-20 flex w-full flex-col items-center gap-7 p-5">
      <div className="relative h-38 w-full">
        <MainBox className="absolute bottom-0 left-0 flex w-full flex-col items-end gap-4 rounded-2xl border border-gray-200 p-5">
          <div className="flex w-42 flex-col items-start gap-4">
            <span className="text-body1-m h-fit w-fit">현재 데이터 사용량</span>
            <div className="flex h-fit w-fit items-end gap-1">
              <span className="text-main-m h-fit w-fit">{totalUsageGB}GB</span>
              <span className="text-body2-m h-fit w-fit text-gray-500">
                / {totalLimitGB !== null ? `${totalLimitGB}GB` : '무제한'}
              </span>
            </div>
          </div>
          <div className="h-2 w-full">
            <ProgressBar value={usagePercent} />
          </div>
        </MainBox>
        <div className="absolute -top-5 left-5 z-10">
          <DaboIcon type="default" usage={usagePercent} width={130} height={130} />
        </div>
      </div>

      <UsageActionCards
        onRecapClick={() => router.push('/recap')}
        onEmergencyClick={() =>
          router.push(
            `/appeal/create/reason?policy=${encodeURIComponent(
              APPEAL_TYPE_LABEL.EMERGENCY,
            )}&amount=${APPEAL_UI_TEXT.EMERGENCY_DATA_AMOUNT}`,
          )
        }
        onBegClick={() => router.push('/appeal/objection')}
        isEmergencyUsed={isEmergencyUsed}
        isMember={isMember}
        isCurrentMonth={isCurrentMonth}
      />

      <MonthNavigator year={year} month={month} onPrev={handlePrevMonth} onNext={handleNextMonth} />

      <div className="flex w-full flex-col gap-2">
        <ViewSegment viewMode={viewMode} onModeChange={handleModeChange} />

        {displayTotalUsedBytes === 0 ? (
          <MainBox className="m-auto w-full rounded-2xl pt-10 pb-5">
            <div className="flex flex-1 items-center justify-center text-gray-400">
              <p>해당 월의 사용 내역이 존재하지 않습니다.</p>
            </div>
          </MainBox>
        ) : viewMode === 'list' ? (
          <MainBox className="w-full rounded-2xl">
            <CustomerList customers={processedCustomers} />
          </MainBox>
        ) : (
          <UsageChart
            variant="card"
            customers={processedCustomers}
            totalUsageGB={totalUsageGB}
            totalQuotaBytes={displayTotalLimitBytes}
          />
        )}
      </div>
    </div>
  );
};

export default UsageDashboard;
