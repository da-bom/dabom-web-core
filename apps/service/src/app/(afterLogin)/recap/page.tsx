'use client';

import React, { Suspense, useState } from 'react';

import { Button, IosShareIcon } from '@shared';

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
import { MOCK_RECAP_DATA } from 'src/data/recap';

function RecapContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data] = useState(MOCK_RECAP_DATA.data);

  const totalSteps = RECAP_CONFIG.TOTAL_STEPS;
  const isMorning = data.peakUsage.startHour >= 6 && data.peakUsage.startHour < 18;

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

      <div className="flex flex-1 flex-col">
        {currentStep === 0 && (
          <RecapStep1Usage
            usageByWeekday={data.usageByWeekday}
            mostUsedWeekday={data.peakUsage.mostUsedWeekday}
          />
        )}
        {currentStep === 1 && (
          <RecapStep2Time startHour={data.peakUsage.startHour} endHour={data.peakUsage.endHour} />
        )}
        {currentStep === 2 && (
          <RecapStep3Appeal
            requesterName={data.appealHighlights.topSuccessfulRequester.requesterName}
            successRate={Math.round(
              (data.appealSummary.approvedAppeals / data.appealSummary.totalAppeals) * 100,
            )}
            appeals={data.appealHighlights.topSuccessfulRequester.recentApprovedAppeals}
          />
        )}
        {currentStep === 3 && (
          <RecapStep4Angel
            approverName={data.appealHighlights.topAcceptedApprover.approverName}
            approvedAppeals={data.appealHighlights.topAcceptedApprover.recentAcceptedAppeals.slice(
              0,
              3,
            )}
          />
        )}
        {currentStep === 4 && (
          <RecapStep5Mission
            totalCount={data.missionSummary.totalMissionCount}
            successCount={data.missionSummary.completedMissionCount}
            failureCount={data.missionSummary.rejectedRequestCount}
          />
        )}
        {currentStep === 5 && <RecapStep6Report score={data.communicationScore} />}
      </div>

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
        <div className="pointer-events-none fixed bottom-26 left-0 flex w-full justify-center px-5">
          <div className="pointer-events-auto">
            <Button size="lg" color="light" onClick={() => {}}>
              <div className="flex items-center gap-2">
                <IosShareIcon sx={{ fontSize: 16 }} />
                {RECAP_UI_TEXT.SHARE}
              </div>
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
