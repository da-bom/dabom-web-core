'use client';

import { useSyncExternalStore } from 'react';

import { Box, Skeleton } from '@mui/material';

import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';
import PolicyManagementList from 'src/components/policy/PolicyManagementList';

const PolicyManagementSkeleton = () => (
  <div className="flex w-full flex-col gap-4 px-5 py-6">
    <Skeleton variant="text" width="40%" height={32} className="mb-4" />

    {[1, 2, 3, 4].map((i) => (
      <Box
        key={i}
        className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
      >
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton variant="text" width="30%" height={24} />
          <Skeleton variant="text" width="60%" height={20} />
        </div>

        <Skeleton className="rounded-lg" variant="rectangular" width={60} height={40} />
      </Box>
    ))}
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

export default function PolicyManagementPage() {
  const isClient = useIsClient();
  const { data: familyDetail, isLoading, isError } = useGetFamilyPolicies();

  if (!isClient || isLoading) {
    return <PolicyManagementSkeleton />;
  }

  if (isError || !familyDetail?.customers) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-10 text-center">
        <p className="text-body1-m mb-2 text-red-500">데이터를 불러오는데 실패했습니다.</p>
        <p className="text-caption-m text-gray-400">네트워크 상태를 확인해주세요.</p>
      </div>
    );
  }

  const listKey = `policy-list-${familyDetail.customers.length}-${familyDetail.customers.map((c) => c.customerId).join('-')}`;

  return (
    <div className="pb-20">
      <PolicyManagementList key={listKey} customers={familyDetail.customers} />
    </div>
  );
}
