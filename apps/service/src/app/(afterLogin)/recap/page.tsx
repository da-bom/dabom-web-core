'use client';

import React, { Suspense, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@shared';
import dayjs from 'dayjs';

import { useGetMonthlyRecap } from 'src/api/recap/useGetMonthlyRecap';
import { RecapStep1Usage } from 'src/components/recap/RecapStep1Usage';
import { RecapStep2Time } from 'src/components/recap/RecapStep2Time';
import { RecapStep3Appeal } from 'src/components/recap/RecapStep3Appeal';
import { RecapStep4Angel } from 'src/components/recap/RecapStep4Angel';
import { RecapStep5Mission } from 'src/components/recap/RecapStep5Mission';
import { RecapStep6Report } from 'src/components/recap/RecapStep6Report';
import BalancedOpalescentBackground from 'src/components/recap/utils/BalancedOpalescentBackground';
import {
  CrystalSkyBackground,
  DeepBlueLuminousBackground,
} from 'src/components/recap/utils/RecapStep2Background';
import { RECAP_CONFIG, RECAP_UI_TEXT } from 'src/constants/recap';

function RecapContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const { year, month } = useMemo(() => {
    const prevMonth = dayjs().subtract(1, 'month');
    return {
      year: prevMonth.year(),
      month: prevMonth.month() + 1,
    };
  }, []);

  const { data, isLoading, isError } = useGetMonthlyRecap(year, month);

  if (isLoading || !data) {
    return <div className="bg-background-base h-full min-h-screen" />;
  }

  if (isError) {
    return (
      <div className="bg-background-base flex h-full min-h-screen flex-col items-center justify-center p-8 text-center">
        <p className="text-h2-m mb-4">오류 발생.</p>
        <Button size="md" color="light" onClick={() => window.location.reload()}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  const isMorning =
    data.peakUsage.startHour >= RECAP_CONFIG.MORNING_START_HOUR &&
    data.peakUsage.startHour < RECAP_CONFIG.MORNING_END_HOUR;

  const successRate =
    data.appealSummary.totalAppeals > 0
      ? Math.round((data.appealSummary.approvedAppeals / data.appealSummary.totalAppeals) * 100)
      : 0;

  const steps = [
    <RecapStep1Usage
      key="step1"
      usageByWeekday={data.usageByWeekday}
      mostUsedWeekday={data.peakUsage.mostUsedWeekday}
    />,
    <RecapStep2Time
      key="step2"
      startHour={data.peakUsage.startHour}
      endHour={data.peakUsage.endHour}
    />,
    <RecapStep3Appeal
      key="step3"
      requesterName={data.appealHighlights.topSuccessfulRequester?.requesterName ?? ''}
      successRate={successRate}
      appeals={data.appealHighlights.topSuccessfulRequester?.recentApprovedAppeals ?? []}
    />,
    <RecapStep4Angel
      key="step4"
      approverName={data.appealHighlights.topAcceptedApprover?.approverName ?? ''}
      approvedAppeals={
        data.appealHighlights.topAcceptedApprover?.recentAcceptedAppeals.slice(
          0,
          RECAP_CONFIG.MAX_RECENT_APPEALS,
        ) ?? []
      }
    />,
    <RecapStep5Mission
      key="step5"
      totalCount={data.missionSummary.totalMissionCount}
      successCount={data.missionSummary.completedMissionCount}
      failureCount={data.missionSummary.rejectedRequestCount}
    />,
    <RecapStep6Report key="step6" score={data.communicationScore ?? 0} />,
  ];

  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-transparent">
      {currentStep === 1 ? (
        isMorning ? (
          <CrystalSkyBackground />
        ) : (
          <DeepBlueLuminousBackground />
        )
      ) : (
        <BalancedOpalescentBackground />
      )}

      <div className="flex flex-1 flex-col">{steps[currentStep]}</div>

      <div className="absolute inset-0 z-10 flex">
        <button
          type="button"
          onClick={prevStep}
          className="h-full w-1/2 cursor-pointer"
          aria-label="Previous step"
        />
        <button
          type="button"
          onClick={nextStep}
          className="h-full w-1/2 cursor-pointer"
          aria-label="Next step"
        />
      </div>

      {currentStep === totalSteps - 1 && (
        <div className="pointer-events-none fixed bottom-26 left-0 z-20 flex w-full justify-center px-5">
          <div className="pointer-events-auto">
            <Button size="lg" color="light" onClick={() => router.push('/home')}>
              <div className="flex items-center">{RECAP_UI_TEXT.BACK_TO_HOME}</div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecapPage() {
  return (
    <Suspense fallback={<div className="bg-background-base h-full min-h-screen" />}>
      <RecapContent />
    </Suspense>
  );
}
