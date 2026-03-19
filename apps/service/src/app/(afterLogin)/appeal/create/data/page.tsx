'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Box, Skeleton } from '@mui/material';
import { Button, MainBox, bytesToGB, cn } from '@shared';

import { useGetFamilyUsageCurrent } from 'src/api/family/useGetFamilyUsage';
import { useGetFamilyPolicies } from 'src/api/policy/useGetFamilyPolicies';
import UnblockToggleBox from 'src/components/appeal/UnblockToggleBox';
import Slider from 'src/components/common/Slider';
import LimitInput from 'src/components/policy/LimitInput';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserId } from 'src/utils/auth';

const MIN_LIMIT = 1;

const DataLimitSkeleton = () => (
  <div className="bg-background-base flex flex-col gap-7 px-5 pt-20">
    <div className="flex w-full flex-col items-start gap-2">
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="40%" height={24} />
    </div>

    <div className="flex w-full flex-col gap-4">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={80}
        sx={{ borderRadius: '16px' }}
        animation="wave"
      />

      <Box className="flex flex-col items-center gap-8 rounded-2xl border border-gray-100 bg-white p-8">
        <div className="flex w-full flex-col gap-2">
          <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: '5px' }} />
          <div className="flex justify-between">
            <Skeleton variant="text" width="30px" />
            <Skeleton variant="text" width="30px" />
          </div>
        </div>
        <Skeleton variant="rectangular" width="120px" height={50} sx={{ borderRadius: '8px' }} />
      </Box>
    </div>

    <div className="fixed bottom-24 left-0 flex w-full gap-2 px-5">
      <Skeleton variant="rectangular" width="30%" height={52} sx={{ borderRadius: '12px' }} />
      <Skeleton variant="rectangular" width="70%" height={52} sx={{ borderRadius: '12px' }} />
    </div>
  </div>
);

export default function DataLimitAppealPage() {
  const { data: familyPolicies, isLoading: isPoliciesLoading } = useGetFamilyPolicies();
  const { data: currentUsage, isLoading: isUsageLoading } = useGetFamilyUsageCurrent();
  const currentUserId = getCurrentUserId();

  if (isPoliciesLoading || isUsageLoading || !familyPolicies || !currentUsage) {
    return <DataLimitSkeleton />;
  }

  const currentUser = familyPolicies.customers.find((c) => c.customerId === currentUserId);
  const currentLimit = currentUser?.monthlyLimitBytes
    ? bytesToGB(currentUser.monthlyLimitBytes)
    : 0;
  const maxLimit = currentUsage?.totalQuotaBytes ? bytesToGB(currentUsage.totalQuotaBytes) : 0;
  const myPolicyId = currentUser?.assignmentIds?.monthlyLimit ?? null;

  return (
    <DataLimitForm
      key={currentLimit}
      currentLimit={currentLimit}
      maxLimit={maxLimit}
      myPolicyId={myPolicyId}
    />
  );
}

function DataLimitForm({
  currentLimit,
  maxLimit,
  myPolicyId,
}: {
  currentLimit: number;
  maxLimit: number;
  myPolicyId: number | null;
}) {
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState(currentLimit);
  const [isUnblockRequested, setIsUnblockRequested] = useState(false);

  const handleInputChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const numValue = numericValue === '' ? MIN_LIMIT : Number(numericValue);
    setSelectedLimit(Math.min(Math.max(numValue, MIN_LIMIT), maxLimit));
  };

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">{APPEAL_UI_TEXT.DATA_LIMIT_TITLE}</h1>
          <p className="text-body2-m text-gray-700">
            {APPEAL_UI_TEXT.CURRENT_LIMIT_LABEL}: {currentLimit}GB
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <UnblockToggleBox
            isUnblockRequested={isUnblockRequested}
            onToggle={() => setIsUnblockRequested(!isUnblockRequested)}
          />

          <MainBox
            className={cn(
              'flex h-fit w-full flex-col items-center gap-4 rounded-2xl border border-gray-200 px-4 py-8 transition-colors',
              isUnblockRequested ? 'bg-background-sub' : 'bg-brand-white',
            )}
          >
            <div className="flex h-fit w-full flex-col gap-1">
              <Slider
                key={maxLimit}
                min={MIN_LIMIT}
                max={maxLimit}
                value={selectedLimit}
                onChange={setSelectedLimit}
                disabled={isUnblockRequested}
              />
              <div className="text-caption-m flex w-full justify-between px-1 text-gray-800">
                <span>{MIN_LIMIT}GB</span>
                <span>{maxLimit}GB</span>
              </div>
            </div>

            <div className="flex h-fit w-full items-center justify-center gap-1">
              <LimitInput
                value={selectedLimit}
                onChange={handleInputChange}
                disabled={isUnblockRequested}
              />
              <span className="text-body1-m text-gray-800">GB</span>
            </div>
          </MainBox>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="white" onClick={() => router.back()}>
          이전
        </Button>
        <Button
          size="lg"
          color="dark"
          onClick={() =>
            router.push(
              `/appeal/create/reason?id=${myPolicyId || ''}&amount=${selectedLimit}&unblock=${isUnblockRequested}&policy=${encodeURIComponent(APPEAL_TYPE_LABEL.NORMAL)}`,
            )
          }
        >
          다음
        </Button>
      </div>
    </div>
  );
}
