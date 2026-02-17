"use client";

import React, { useCallback, useRef, useState } from "react";

import { gbToBytes } from "@shared";

import { FAMILY_DETAIL } from "@shared/data/familyDetail";

import MemberCard from "@service/components/MemberCard";
import TimeSettingBottomSheet from "@service/components/TimeSettingBottomSheet";

export interface CustomerState {
  customerId: number;
  limitBytes: number;
  isTimeEnabled: boolean; // API 가족 구성원 정책 수정 (추가 요청할 예정)
  startTime: string | null; // API 가족 구성원 정책 수정 (추가 요청할 예정)
  endTime: string | null; // API 가족 구성원 정책 수정 (추가 요청할 예정)
}

export default function PolicyManagementPage() {
  const { customers } = FAMILY_DETAIL;

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [memberStates, setMemberStates] = useState<
    Record<string, CustomerState>
  >(() => {
    const initial: Record<string, CustomerState> = {};
    customers.forEach((c) => {
      initial[c.customerId.toString()] = {
        customerId: c.customerId,
        limitBytes: c.monthlyLimitBytes,
        isTimeEnabled: true,
        startTime: "23:00",
        endTime: "07:00",
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

      // API 호출 디바운싱
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        try {
          console.log(`[API 요청 - 한도] ID: ${id}, 값: ${newBytes} Bytes`);
          // API 사용
        } catch (error) {
          console.error("API 요청 실패:", error);
        }
      }, 500);
    },

    onToggleTime: (id: string) => {
      setMemberStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], isTimeEnabled: !prev[id].isTimeEnabled },
      }));
    },

    onTimeClick: (id: string, type: "start" | "end") => {
      setSheetConfig({
        isOpen: true,
        targetId: id,
        type: type,
      });
    },
  };

  const handleSaveTime = async (newTime: string) => {
    const { targetId, type } = sheetConfig;
    if (!targetId) return;

    setMemberStates((prev) => ({
      ...prev,
      [targetId]: {
        ...prev[targetId],
        [type === "start" ? "startTime" : "endTime"]: newTime,
      },
    }));

    try {
      const currentState = memberStates[targetId];
      const updatedStart = type === "start" ? newTime : currentState.startTime;
      const updatedEnd = type === "end" ? newTime : currentState.endTime;

      console.log(
        `[API 요청 - 시간] ID: ${targetId} | Start: ${updatedStart} - End: ${updatedEnd}`,
      );
    } catch (error) {
      console.error("API 요청 실패", error);
    }
  };

  const handleCLoseSheet = useCallback(() => {
    setSheetConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const activeCustomerState = sheetConfig.targetId
    ? memberStates[sheetConfig.targetId]
    : null;

  const targetTime =
    sheetConfig.type === "start"
      ? activeCustomerState?.startTime
      : activeCustomerState?.endTime;

  const initialTimeForSheet = targetTime ?? "00:00";

  return (
    <section className="flex min-h-screen w-full justify-center">
      <div className="mt-4 w-full px-4 pb-20">
        <div className="text-body1-m mb-4">
          변경을 원하는 구성원을 선택하세요.
        </div>

        <ul className="flex flex-col gap-4">
          {customers.map((customer) => (
            <MemberCard
              key={customer.customerId}
              customer={{
                ...customer,
                phoneNumber: "010-****-1234", // Mock에 없어서 임시 주입
              }}
              state={memberStates[customer.customerId.toString()]}
              isSelected={selectedId === customer.customerId.toString()}
              handlers={handlers}
            />
          ))}
        </ul>

        <TimeSettingBottomSheet
          key={initialTimeForSheet}
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
