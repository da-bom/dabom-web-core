'use client';

import React, { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Divider, MainBox, gbToBytes } from '@shared';

import { usePostAppeal } from 'src/api/appeal/usePostAppeal';
import { usePostEmergencyAppeal } from 'src/api/appeal/usePostEmergencyAppeal';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';

function AppealConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const policy = searchParams.get('policy');
  const amount = searchParams.get('amount');
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const isUnblock = searchParams.get('unblock') === 'true';
  const reason = searchParams.get('reason') || '';
  const policyAssignmentId = Number(searchParams.get('id')) || 0;

  const { mutateAsync: postEmergency } = usePostEmergencyAppeal();
  const { mutateAsync: postAppeal } = usePostAppeal();

  const handleSubmit = async () => {
    try {
      if (policy === APPEAL_TYPE_LABEL.EMERGENCY) {
        await postEmergency(reason);
      } else {
        const desiredRules: { limitBytes?: number | null; start?: string; end?: string } = {};

        if (isUnblock) {
          if (policy === APPEAL_TYPE_LABEL.NORMAL) {
            desiredRules.limitBytes = null;
          } else if (policy === APPEAL_TYPE_LABEL.TIME_BLOCK) {
            desiredRules.start = undefined;
            desiredRules.end = undefined;
          }
        } else {
          if (policy === APPEAL_TYPE_LABEL.NORMAL && amount) {
            desiredRules.limitBytes = gbToBytes(Number(amount));
          } else if (policy === APPEAL_TYPE_LABEL.TIME_BLOCK && start && end) {
            desiredRules.start = start;
            desiredRules.end = end;
          }
        }

        const requestData = {
          policyAssignmentId,
          requestReason: reason,
          policyActive: !isUnblock,
          desiredRules: Object.keys(desiredRules).length > 0 ? desiredRules : null,
        };
        await postAppeal(requestData);
      }
      router.push('/appeal');
    } catch (error) {
      console.error('이의 제기 요청 실패:', error);
    }
  };

  const getChangedValue = () => {
    if (isUnblock) {
      if (policy === APPEAL_TYPE_LABEL.NORMAL) {
        return APPEAL_UI_TEXT.UNBLOCK_LIMIT;
      }
      if (policy === APPEAL_TYPE_LABEL.TIME_BLOCK) {
        return APPEAL_UI_TEXT.UNBLOCK_LIMIT;
      }
      if (policy === APPEAL_TYPE_LABEL.APP_BLOCK) {
        return APPEAL_UI_TEXT.APP_BLOCK;
      }
      return APPEAL_UI_TEXT.MANUAL_BLOCK;
    }
    if (policy === APPEAL_TYPE_LABEL.NORMAL && amount) {
      return `${amount}GB`;
    }
    if (policy === APPEAL_TYPE_LABEL.TIME_BLOCK && start && end) {
      return `${start} ~ ${end}`;
    }
    if (policy === APPEAL_TYPE_LABEL.MANUAL_BLOCK) {
      return APPEAL_UI_TEXT.MANUAL_BLOCK;
    }
    if (policy === APPEAL_TYPE_LABEL.EMERGENCY) {
      return APPEAL_UI_TEXT.EMERGENCY_DATA_AMOUNT;
    }
    return '';
  };

  return (
    <div className="bg-background-base flex flex-col">
      <div className="flex flex-col items-center gap-7 px-5 pt-20">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-h2-m">{APPEAL_UI_TEXT.CONFIRM_TITLE}</h1>
          <p className="text-body2-m text-gray-700">{APPEAL_UI_TEXT.CONFIRM_DESCRIPTION}</p>
        </div>

        <MainBox className="bg-brand-white flex h-fit w-full flex-col gap-0 rounded-2xl border border-gray-100">
          <div className="flex flex-col px-5 pt-5 pb-2">
            <span className="text-body1-m text-gray-800">
              {APPEAL_UI_TEXT.POLICY_PREFIX}
              {policy}
            </span>
            <span className="text-body1-m text-gray-800">
              {APPEAL_UI_TEXT.CHANGE_PREFIX}
              {getChangedValue()}
            </span>
          </div>

          <Divider className="mx-5" />

          <div className="flex flex-col px-5 pt-2 pb-5">
            <span className="text-body1-m font-medium text-gray-800">
              {APPEAL_UI_TEXT.REASON_PREFIX}
              {reason}
            </span>
          </div>
        </MainBox>
      </div>

      <div className="fixed bottom-24 left-0 flex w-full items-center justify-center gap-2 px-5">
        <Button size="md-short" color="light" onClick={() => router.back()}>
          이전
        </Button>
        <Button size="lg" color="primary" onClick={handleSubmit}>
          이의 제기 하기
        </Button>
      </div>
    </div>
  );
}

export default function AppealConfirmPage() {
  return (
    <Suspense fallback={<div className="h-full min-h-screen" />}>
      <AppealConfirmContent />
    </Suspense>
  );
}
