"use client";

import React, { useCallback, useState, useSyncExternalStore } from "react";

import { gbToBytes } from "@shared";
import { useGetFamilyPolicies, useUpdatePolicy } from "src/hooks/usePolicies";

import { CustomerDetail } from "@shared/type/familyType";

import MemberCard from "@service/components/MemberCard";
import TimeSettingBottomSheet from "@service/components/TimeSettingBottomSheet";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export interface CustomerState {
  customerId: number;
  limitBytes: number;
  timeLimit: {
    start: string;
    end: string;
  } | null;
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

  if (isError || !familyDetail || !familyDetail.customers) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-body1-m text-red-500">
          데이터를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  return <PolicyManagementList customers={familyDetail.customers} />;
}

interface PolicyManagementListProps {
  customers: CustomerDetail[];
}

function PolicyManagementList({ customers }: PolicyManagementListProps) {
  const currentUserRole = "OWNER";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutate: updatePolicy } = useUpdatePolicy();
  const [memberStates, setMemberStates] = useState<
    Record<string, CustomerState>
  >(() => {
    const initial: Record<string, CustomerState> = {};
    customers.forEach((c) => {
      initial[c.customerId.toString()] = {
        customerId: c.customerId,
        limitBytes: c.monthlyLimitBytes,
        timeLimit: {
          start: "23:00",
          end: "07:00",
        },
      };
    });
    return initial;
  });

  const [sheetConfig, setSheetConfig] = useState<{
    isOpen: boolean;
    targetId: string | null;
    type: "start" | "end";
  }>({
    isOpen: false,
    targetId: null,
    type: "start",
  });

  const handlers = {
    onSelect: (id: string) =>
      setSelectedId((prev) => (prev === id ? null : id)),

    onLimitChange: (id: string, newGB: number) => {
      const newBytes = gbToBytes(newGB);

      setMemberStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], limitBytes: newBytes },
      }));
      updatePolicy({
        update: {
          customerId: Number(id),
          type: "MONTHLY_LIMIT",
          value: { limitBytes: newBytes },
          isActive: true,
        },
      });
    },

    onToggleTime: (id: string) => {
      setMemberStates((prev) => {
        const currentTarget = prev[id];
        const isCurrentlyOn = !!currentTarget.timeLimit;

        updatePolicy({
          update: {
            customerId: Number(id),
            type: "TIME_BLOCK",
            isActive: !isCurrentlyOn,
            ...(!isCurrentlyOn
              ? {
                  value: {
                    start: "00:00",
                    end: "23:59",
                    timezone: "Asia/Seoul",
                  },
                }
              : {}),
          },
        });

        return {
          ...prev,
          [id]: {
            ...currentTarget,
            timeLimit: isCurrentlyOn ? null : { start: "00:00", end: "23:59" },
          },
        };
      });
    },

    onTimeClick: (id: string, type: "start" | "end") => {
      setSheetConfig({
        isOpen: true,
        targetId: id,
        type,
      });
    },
  };

  const handleSaveTime = async (newTime: string) => {
    const { targetId, type } = sheetConfig;
    if (!targetId) return;

    const currentState = memberStates[targetId];
    const currentLimit = currentState.timeLimit || {
      start: "00:00",
      end: "23:59",
    };
    const updatedStart = type === "start" ? newTime : currentLimit.start;
    const updatedEnd = type === "end" ? newTime : currentLimit.end;

    setMemberStates((prev) => ({
      ...prev,
      [targetId]: {
        ...currentState,
        timeLimit: { start: updatedStart, end: updatedEnd },
      },
    }));

    updatePolicy({
      update: {
        customerId: Number(targetId),
        type: "TIME_BLOCK",
        value: { start: updatedStart, end: updatedEnd, timezone: "Asia/Seoul" },
        isActive: true,
      },
    });
  };

  const handleCLoseSheet = useCallback(() => {
    setSheetConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const activeCustomerState = sheetConfig.targetId
    ? memberStates[sheetConfig.targetId]
    : null;

  const targetTime =
    sheetConfig.type === "start"
      ? activeCustomerState?.timeLimit?.start
      : activeCustomerState?.timeLimit?.end;

  const initialTimeForSheet = targetTime ?? "00:00";

  return (
    <section className="flex min-h-screen w-full justify-center">
      <div className="mt-4 w-full px-4 pb-20">
        {currentUserRole === "OWNER" && (
          <div className="text-body1-m mb-4">
            변경을 원하는 구성원을 선택하세요.
          </div>
        )}

        <ul className="flex flex-col gap-4">
          {customers.map((customer) => (
            <MemberCard
              key={customer.customerId}
              customer={{
                ...customer,
                phoneNumber: String(customer.phoneNumber) || "정보 없음",
              }}
              state={memberStates[customer.customerId.toString()]}
              isSelected={selectedId === customer.customerId.toString()}
              isEditingByOther={false} // true면 차단
              handlers={handlers}
            />
          ))}
        </ul>

        <TimeSettingBottomSheet
          key={`${sheetConfig.targetId}-${sheetConfig.type}-${initialTimeForSheet}`}
          isOpen={sheetConfig.isOpen}
          onClose={handleCLoseSheet}
          title={
            sheetConfig.type === "start" ? "시작 시간 설정" : "종료 시간 설정"
          }
          initialTime={initialTimeForSheet || "00:00"}
          onSave={handleSaveTime}
        />
      </div>
    </section>
  );
}
