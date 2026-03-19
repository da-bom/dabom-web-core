'use client';

import React, { use, useSyncExternalStore } from 'react';

import { FaceIcon } from '@icons';
import { Skeleton } from '@mui/material';
import { MainBox, bytesToGB, formatPhoneNumber } from '@shared';

import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';
import { useUpdatePolicy } from 'src/api/policy/useUpdatePolicy';
import { AppBlockBox } from 'src/components/policy/AppBlockBox';
import PolicySimple from 'src/components/policy/PolicySimple';

const PolicyDetailSkeleton = () => (
  <div className="flex flex-col items-center gap-4 p-4">
    <Skeleton
      variant="rectangular"
      width="100%"
      height={56}
      sx={{ borderRadius: '16px' }}
      animation="wave"
    />

    <Skeleton
      variant="rectangular"
      width="100%"
      height={100}
      sx={{ borderRadius: '16px' }}
      animation="wave"
    />

    <Skeleton
      variant="rectangular"
      width="100%"
      height={300}
      sx={{ borderRadius: '16px' }}
      animation="wave"
    />
  </div>
);

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

interface PolicyDetailPageProps {
  params: Promise<{ customerId: string }>;
}

export default function PolicyDetailPage({ params }: PolicyDetailPageProps) {
  const { customerId } = use(params);
  const isClient = useIsClient();

  const { data: familyData, isLoading, isError } = useGetFamilyPolicies();
  const { mutate: updatePolicy } = useUpdatePolicy();

  if (!isClient || isLoading) {
    return <PolicyDetailSkeleton />;
  }

  if (isError || !familyData?.customers) {
    return (
      <div className="text-body1-m text-negative flex h-full min-h-screen items-center justify-center">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  const customer = familyData.customers.find((c) => c.customerId.toString() === customerId);

  if (!customer) {
    return (
      <div className="text-body1-m flex h-full min-h-screen items-center justify-center">
        사용자를 찾을 수 없습니다.
      </div>
    );
  }

  const limitText =
    customer.monthlyLimitBytes === null
      ? '-'
      : `${Math.round(bytesToGB(customer.monthlyLimitBytes))}GB`;

  const timeLimitText = customer.timeLimit
    ? `${customer.timeLimit.start} ~ ${customer.timeLimit.end}`
    : '설정되지 않음';

  const appBlockPolicy = customer.policies.find((p) => p.type === 'APP_BLOCK');
  const initialBlockedApps = appBlockPolicy?.rules?.blockedApps ?? [];

  const handleAppBlockUpdate = (blockedApps: string[]) => {
    updatePolicy({
      updateInfo: {
        customerId: Number(customerId),
        type: 'APP_BLOCK',
        value: { blockedApps },
        isActive: true,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 pb-20">
      <MainBox className="flex h-14 w-full flex-row items-center justify-between rounded-2xl p-4">
        <div className="flex flex-row items-center gap-2">
          <FaceIcon sx={{ fontSize: 16, color: 'inherit' }} />
          <span className="text-body1-m">{customer.name}</span>
        </div>
        <span className="text-caption-m text-gray-800">
          {formatPhoneNumber(customer.phoneNumber)}
        </span>
      </MainBox>

      <MainBox className="w-full rounded-2xl p-4">
        <PolicySimple>
          <PolicySimple.Block isBlocked={customer.isBlocked} />
          <PolicySimple.Limit text={limitText} disabled={customer.isBlocked} />
          <PolicySimple.Time
            text={timeLimitText}
            isOn={!!customer.timeLimit}
            disabled={customer.isBlocked}
          />
        </PolicySimple>
      </MainBox>

      <AppBlockBox
        initialBlockedApps={initialBlockedApps}
        onUpdate={handleAppBlockUpdate}
        disabled={customer.isBlocked}
      />
    </div>
  );
}
