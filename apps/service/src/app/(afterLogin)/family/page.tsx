'use client';

import React, { useSyncExternalStore } from 'react';

import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';

import PolicyManagementList from '@service/components/policy/PolicyManagementList';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default function PolicyManagementPage() {
  const isClient = useIsClient();
  const { data: familyDetail, isLoading, isError } = useGetFamilyPolicies();

  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-body1-m">가족 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError || !familyDetail?.customers) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-body1-m text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  const listKey = `policy-list-${familyDetail.customers.length}-${familyDetail.customers.map((c) => c.customerId).join('-')}`;

  return <PolicyManagementList key={listKey} customers={familyDetail.customers} />;
}
