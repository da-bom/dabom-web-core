"use client";

import React, { useCallback, useRef, useState } from "react";

import { gbToBytes } from "@shared";

import { FAMILY_DETAIL } from "@shared/data/familyDetail";

import MemberCard from "@service/components/MemberCard";
import TimeSettingBottomSheet from "@service/components/TimeSettingBottomSheet";

export interface CustomerState {
  customerId: number;
  limitBytes: number;
  timeLimit: {
    start: string;
    end: string;
  } | null;
}

export default function PolicyManagementPage() {
  // 추후 실제 유저 권한 데이터로 교체
  const currentUserRole = "OWNER";

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

      // API 호출 디바운싱
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // debounceTimer.current = setTimeout(async () => {
      //   try {
      //     console.log(`[API 요청 - 한도] ID: ${id}, 값: ${newBytes} Bytes`);
      //     // API 사용
      //   } catch (error) {
      //     console.error("API 요청 실패:", error);
      //   }
      // }, 500);
    },

    onToggleTime: (id: string) => {
      setMemberStates((prev) => {
        const currentTarget = prev[id];
        return {
          ...prev,
          [id]: {
            ...currentTarget,
            timeLimit: currentTarget.timeLimit
              ? null
              : { start: "00:00", end: "23:59" },
          },
        };
      });
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

    setMemberStates((prev) => {
      const currentTarget = prev[targetId];
      const currentLimit = currentTarget.timeLimit || {
        start: "00:00",
        end: "23:59",
      };

      return {
        ...prev,
        [targetId]: {
          ...currentTarget,
          timeLimit: {
            ...currentLimit,
            [type]: newTime,
          },
        },
      };
    });

    // try {
    //   const currentState = memberStates[targetId];
    //   const updatedStart = type === "start" ? newTime : currentState.startTime;
    //   const updatedEnd = type === "end" ? newTime : currentState.endTime;

    //   console.log(
    //     `[API 요청 - 시간] ID: ${targetId} | Start: ${updatedStart} - End: ${updatedEnd}`,
    //   );
    // } catch (error) {
    //   console.error("API 요청 실패", error);
    // }
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
                phoneNumber: "010-****-1234", // Mock에 없어서 임시 주입
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
