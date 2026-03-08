'use client';

import React, { Suspense, useSyncExternalStore } from 'react';

import { useSearchParams } from 'next/navigation';

import { FaceIcon } from '@icons';
import { MainBox, bytesToGB, formatPhoneNumber } from '@shared';
import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';

import PolicySimple from '@service/components/policy/PolicySimple';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function PolicyDetailContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get('customerId');
  const isClient = useIsClient();

  const { data: familyData, isLoading, isError } = useGetFamilyPolicies();

  if (!isClient || isLoading) {
    return (
      <div className="text-body1-m flex min-h-screen items-center justify-center">
        가족 데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !familyData?.customers) {
    return (
      <div className="text-body1-m text-negative flex min-h-screen items-center justify-center">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }
  const customer = familyData.customers.find((c) => c.customerId.toString() === customerId);

  if (!customer) {
    return (
      <div className="text-body1-m flex min-h-screen items-center justify-center">
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

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-4">
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
    </div>
  );
}

export default function PolicyDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="text-body1-m flex min-h-screen items-center justify-center">로딩 중...</div>
      }
    >
      <PolicyDetailContent />
    </Suspense>
  );
}
