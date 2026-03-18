'use client';

import React, { useCallback, useState } from 'react';

import { gbToBytes } from '@shared';

import { useGetFamilyUsageCurrent } from 'src/api/family/useGetFamilyUsage';
import { ServiceCustomerDetail } from 'src/api/policy/schema';
import { useUpdatePolicy } from 'src/api/policy/useUpdatePolicy';
import MemberCard from 'src/components/policy/MemberCard';
import TimeSettingBottomSheet from 'src/components/policy/TimeSettingBottomSheet';
import { UserRole, getCurrentUserRole } from 'src/utils/auth';

export interface CustomerState {
  customerId: number;
  limitBytes: number | null;
  timeLimit: {
    start: string;
    end: string;
  } | null;
  isBlocked: boolean;
}

interface PolicyManagementListProps {
  readonly customers: ServiceCustomerDetail[];
}

const DEFAULT_TIME_LIMIT = { start: '00:00', end: '23:00' };

export default function PolicyManagementList({ customers }: PolicyManagementListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutate: updatePolicy } = useUpdatePolicy();
  const { data: familyUsage } = useGetFamilyUsageCurrent();

  const [currentUserRole] = useState<UserRole>(getCurrentUserRole);
  const isOwner = currentUserRole === 'OWNER';

  const [memberStates, setMemberStates] = useState<Record<string, CustomerState>>(() => {
    const initial: Record<string, CustomerState> = {};
    customers.forEach((c) => {
      initial[c.customerId.toString()] = {
        customerId: c.customerId,
        limitBytes: c.monthlyLimitBytes,
        timeLimit: c.timeLimit || null,
        isBlocked: c.isBlocked || false,
      };
    });
    return initial;
  });

  const [sheetConfig, setSheetConfig] = useState<{
    isOpen: boolean;
    targetId: string | null;
    type: 'start' | 'end';
  }>({
    isOpen: false,
    targetId: null,
    type: 'start',
  });

  const handlers = {
    onSelect: (id: string) => setSelectedId((prev) => (prev === id ? null : id)),

    onLimitChange: (id: string, newGB: number | null) => {
      if (!isOwner) return;
      const newBytes = newGB === null ? null : gbToBytes(newGB);
      const isActive = newBytes !== null;

      setMemberStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], limitBytes: newBytes },
      }));
      updatePolicy({
        updateInfo: {
          customerId: Number(id),
          type: 'MONTHLY_LIMIT',
          value: { limitBytes: newBytes },
          isActive,
        },
      });
    },

    onToggleTime: (id: string) => {
      if (!isOwner) return;
      const currentTarget = memberStates[id];
      if (!currentTarget) return;

      const isCurrentlyOn = !!currentTarget.timeLimit;

      setMemberStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          timeLimit: isCurrentlyOn ? null : DEFAULT_TIME_LIMIT,
        },
      }));

      if (isCurrentlyOn) {
        updatePolicy({
          updateInfo: {
            customerId: Number(id),
            type: 'TIME_BLOCK',
            isActive: false,
          },
        });
      } else {
        updatePolicy({
          updateInfo: {
            customerId: Number(id),
            type: 'TIME_BLOCK',
            value: { ...DEFAULT_TIME_LIMIT, timezone: 'Asia/Seoul' },
            isActive: true,
          },
        });
      }
    },

    onTimeClick: (id: string, type: 'start' | 'end') => {
      if (!isOwner) return;
      setSheetConfig({
        isOpen: true,
        targetId: id,
        type,
      });
    },

    onToggleBlock: (id: string) => {
      if (!isOwner) return;
      const currentState = memberStates[id];
      if (!currentState) return;

      const newIsBlocked = !currentState.isBlocked;

      setMemberStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], isBlocked: newIsBlocked },
      }));

      updatePolicy({
        updateInfo: {
          customerId: Number(id),
          type: 'MANUAL_BLOCK',
          value: { reason: 'MANUAL' },
          isActive: newIsBlocked,
        },
      });
    },
  };

  const handleSaveTime = async (newTime: string) => {
    if (!isOwner) return;
    const { targetId, type } = sheetConfig;
    if (!targetId) return;

    const currentState = memberStates[targetId];
    const currentLimit = currentState.timeLimit || DEFAULT_TIME_LIMIT;
    const updatedStart = type === 'start' ? newTime : currentLimit.start;
    const updatedEnd = type === 'end' ? newTime : currentLimit.end;

    setMemberStates((prev) => ({
      ...prev,
      [targetId]: {
        ...currentState,
        timeLimit: { start: updatedStart, end: updatedEnd },
      },
    }));

    updatePolicy({
      updateInfo: {
        customerId: Number(targetId),
        type: 'TIME_BLOCK',
        value: { start: updatedStart, end: updatedEnd, timezone: 'Asia/Seoul' },
        isActive: true,
      },
    });
  };

  const handleCloseSheet = useCallback(() => {
    setSheetConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const activeCustomerState = sheetConfig.targetId ? memberStates[sheetConfig.targetId] : null;
  const initialTimeForSheet =
    (sheetConfig.type === 'start'
      ? activeCustomerState?.timeLimit?.start
      : activeCustomerState?.timeLimit?.end) ?? '00:00';

  const familyName = familyUsage?.familyName ?? '가족 관리';

  return (
    <section className="flex w-full justify-center">
      <div className="mt-4 w-full px-5 pb-10">
        <div className="mb-5 flex flex-col gap-1">
          <div className="text-body1-d">{familyName}</div>
          {isOwner && (
            <div className="text-body2-m">데이터 사용 정책을 변경할 구성원을 선택하세요.</div>
          )}
        </div>

        <ul className="flex flex-col gap-2">
          {customers.map((customer) => {
            const customerIdStr = customer.customerId.toString();
            return (
              <MemberCard
                key={customer.customerId}
                customer={{
                  ...customer,
                  phoneNumber: String(customer.phoneNumber) || '정보 없음',
                }}
                state={memberStates[customerIdStr]}
                isSelected={selectedId === customerIdStr}
                isOwner={isOwner}
                isEditingByOther={false}
                totalQuotaBytes={familyUsage?.totalQuotaBytes}
                handlers={handlers}
              />
            );
          })}
        </ul>

        <TimeSettingBottomSheet
          key={`${sheetConfig.targetId}-${sheetConfig.type}-${initialTimeForSheet}`}
          isOpen={sheetConfig.isOpen}
          onClose={handleCloseSheet}
          title={sheetConfig.type === 'start' ? '시작 시간 설정' : '종료 시간 설정'}
          initialTime={initialTimeForSheet}
          onSave={handleSaveTime}
        />
      </div>
    </section>
  );
}
