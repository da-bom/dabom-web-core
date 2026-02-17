"use client";

import React from "react";

import { cn } from "@shared";
import { formatSize } from "@shared";

const MAX_LIMIT_GB = 70;

export interface CustomerState {
  customerId: number;
  limitBytes: number;
  isTimeEnabled: boolean;
  startTime: string | null;
  endTime: string | null;
}

interface MemberCardProps {
  customer: {
    customerId: number;
    name: string;
    phoneNumber: string;
    monthlyUsedBytes: number;
    monthlyLimitBytes: number;
  };
  state: CustomerState;
  isSelected: boolean;

  handlers: {
    onSelect: (id: string) => void;
    onLimitChange: (id: string, newGB: number) => void;
    onToggleTime: (id: string) => void;
    onTimeClick: (id: string, type: "start" | "end") => void;
  };
}

export default function MemberCard({
  customer,
  state,
  isSelected,
  handlers,
}: MemberCardProps) {
  const idStr = customer.customerId.toString();
  const currentLimitGB = Math.round(state.limitBytes / (1024 * 1024 * 1024));

  const sliderPercentage = (currentLimitGB / MAX_LIMIT_GB) * 100;

  const formattedUsed = formatSize(customer.monthlyUsedBytes).total;
  const formattedTotal = formatSize(state.limitBytes).total;

  const usagePercent =
    state.limitBytes === 0
      ? 0
      : Math.min((customer.monthlyUsedBytes / state.limitBytes) * 100, 100);

  const isDanger = usagePercent >= 90;

  return (
    <li
      className={cn(
        "bg-brand-white flex w-full list-none flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 ease-in-out",
        isSelected ? "border-primary shadow-default" : "border-gray-200",
      )}
    >
      <button
        type="button"
        onClick={() => handlers.onSelect(idStr)}
        className="flex w-full flex-col gap-4 p-4 text-left"
        aria-expanded={isSelected}
        aria-controls={`detail-${idStr}`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-body1-m">{customer.name}</span>
            <span className="text-caption-m text-gray-800">
              {customer.phoneNumber || "010-****-1234"}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="text-caption-m">
              <span className={isDanger ? "text-negative" : "text-brand-black"}>
                {formattedUsed}{" "}
              </span>
              <span className="text-gray-800">/ {formattedTotal}</span>
            </div>

            <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-100">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      <div
        id={`detail-${idStr}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isSelected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-4 h-px bg-gray-100" />

          <div className="flex flex-col gap-6 p-4 pt-6">
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary h-3 w-3 rounded-sm" />
                  <span className="text-body1-m">데이터 사용 한도</span>
                </div>
                <span className="text-body1-m text-primary font-bold">
                  {currentLimitGB}GB
                </span>
              </div>

              <div className="grid h-8 w-full items-center">
                <div className="col-start-1 row-start-1 h-2 w-full rounded-full bg-gray-100" />
                <div
                  className="bg-primary-500 col-start-1 row-start-1 h-2 justify-self-start rounded-full"
                  style={{ width: `${sliderPercentage}%` }}
                />

                <div
                  className="pointer-events-none col-start-1 row-start-1 flex w-full items-center"
                  style={{ marginLeft: `${sliderPercentage}%` }}
                >
                  <div className="border-primary-500 bg-brand-white h-4 w-4 -translate-x-1/2 rounded-full border-2 shadow-sm" />
                </div>
                <input
                  type="range"
                  min="0"
                  max={MAX_LIMIT_GB}
                  step="1"
                  value={currentLimitGB}
                  onChange={(e) =>
                    handlers.onLimitChange(idStr, Number(e.target.value))
                  }
                  className="col-start-1 row-start-1 h-full w-full cursor-pointer touch-none opacity-0"
                  aria-label="데이터 한도 설정"
                />
              </div>

              <div className="text-caption-m flex w-full justify-between text-gray-800">
                <span>0GB</span>
                <span>{MAX_LIMIT_GB}GB</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary h-3 w-3 rounded-sm" />
                  <span className="text-body1-m">시간 제한</span>
                </div>

                <button
                  type="button"
                  onClick={() => handlers.onToggleTime(idStr)}
                  role="switch"
                  aria-checked={state.isTimeEnabled}
                  className={cn(
                    "flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out",
                    state.isTimeEnabled ? "bg-primary-500" : "bg-gray-500",
                  )}
                >
                  <div
                    className={cn(
                      "bg-brand-white shadow-default h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out",
                      state.isTimeEnabled ? "translate-x-3" : "translate-x-0",
                    )}
                  />
                </button>
              </div>

              {state.isTimeEnabled && state.startTime && state.endTime ? (
                <div className="bg-background-sub flex h-20 w-full flex-col items-center justify-center gap-2 rounded-lg">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handlers.onTimeClick(idStr, "start")}
                      className="border-primary-200 bg-primary-50 flex h-6 w-15 items-center justify-center rounded border"
                    >
                      <span className="text-body1-m">{state.startTime}</span>
                    </button>
                    <span className="text-body1-m mx-2">부터</span>

                    <button
                      type="button"
                      onClick={() => handlers.onTimeClick(idStr, "end")}
                      className="border-primary-200 bg-primary-50 flex h-6 w-15 items-center justify-center rounded border"
                    >
                      <span className="text-body1-m">{state.endTime}</span>
                    </button>
                    <span className="text-body1-m ml-2">까지</span>
                  </div>
                  <span className="text-caption-m text-gray-800">
                    터치하여 시간을 설정하세요.
                  </span>
                </div>
              ) : (
                <div className="bg-background-sub flex h-12 w-full items-center justify-center rounded-lg">
                  <span className="text-caption-m text-gray-800">
                    시간 제한이 설정되지 않았습니다.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
