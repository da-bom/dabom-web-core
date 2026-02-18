"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Icon, MainBox, bytesToGB, cn } from "@shared";
import CUSTOMER_LIST from "src/data/customerList";

import MonthNavigator from "@service/components/MonthNavigator";
import ProgressBar from "@service/components/ProgressBar";

import CustomerList from "./CustomerList";
import UsageChart from "./UsageChart";

const UsageDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const year = Number(searchParams.get("year")) || new Date().getFullYear();
  const month = Number(searchParams.get("month")) || new Date().getMonth() + 1;
  const viewMode = (searchParams.get("view") as "list" | "chart") || "list";

  const totalUsedBytes = CUSTOMER_LIST.customers.reduce(
    (acc, curr) => acc + curr.monthlyUsedBytes,
    0,
  );
  const totalUsageGB = bytesToGB(totalUsedBytes);
  const totalLimitGB = bytesToGB(CUSTOMER_LIST.totalQuotaBytes);
  const usagePercent = Math.min(
    Math.round((totalUsedBytes / CUSTOMER_LIST.totalQuotaBytes) * 100),
    100,
  );

  const displayDate = `${year}년 ${month}월`;

  const updateUrl = (
    nextYear: number,
    nextMonth: number,
    nextView: "list" | "chart",
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", nextYear.toString());
    params.set("month", nextMonth.toString());
    params.set("view", nextView);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePrevMonth = () => {
    let newYear = year;
    let newMonth = month - 1;
    if (newMonth < 1) {
      newYear -= 1;
      newMonth = 12;
    }
    updateUrl(newYear, newMonth, viewMode);
  };

  const handleNextMonth = () => {
    let newYear = year;
    let newMonth = month + 1;
    if (newMonth > 12) {
      newYear += 1;
      newMonth = 1;
    }
    updateUrl(newYear, newMonth, viewMode);
  };

  const handleModeChange = (mode: "list" | "chart") => {
    if (viewMode !== mode) {
      updateUrl(year, month, mode);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 px-5 pt-15">
      <MainBox className="w-full p-5">
        <div className="flex flex-col gap-2">
          <span className="text-body1-m text-brand-dark">
            현재 데이터 사용량
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-main-m text-4xl font-bold">
              {totalUsageGB}GB
            </span>
            <span className="text-body2-m text-gray-600">
              / {totalLimitGB}GB
            </span>
          </div>
        </div>
        <Icon className="-mt-35 -mr-2 ml-auto block" name="Bomi" />
        <div className="mt-6">
          <ProgressBar value={usagePercent} className="h-4" />
        </div>
      </MainBox>

      <div className="flex flex-col items-center gap-4">
        <MonthNavigator
          currentDateText={displayDate}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        <div className="bg-brand-white flex h-8 w-full max-w-87.5 items-center rounded-full border border-gray-200">
          <button
            onClick={() => handleModeChange("list")}
            className={cn(
              "text-caption-m flex h-5 flex-1 items-center justify-center gap-1 rounded-full transition-colors",
              viewMode === "list"
                ? "bg-primary-50 text-primary"
                : "bg-transparent text-gray-400",
            )}
          >
            {/* <Icon name="List" /> */}
            <span>리스트</span>
          </button>

          <button
            onClick={() => handleModeChange("chart")}
            className={cn(
              "text-caption-m flex h-5 flex-1 items-center justify-center gap-1 rounded-full transition-colors",
              viewMode === "chart"
                ? "bg-primary-50 text-primary"
                : "bg-transparent text-gray-400",
            )}
          >
            {/* <Icon name="Graph" /> */}
            <span>차트</span>
          </button>
        </div>
      </div>

      <MainBox className="m-auto w-full rounded-xl p-5">
        {CUSTOMER_LIST.customers.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            <p>등록된 가족 구성원이 없어요.</p>
          </div>
        ) : (
          <>
            {viewMode === "list" ? (
              <CustomerList customers={CUSTOMER_LIST.customers} />
            ) : (
              <div className="mx-auto aspect-square w-full max-w-70">
                <UsageChart
                  customers={CUSTOMER_LIST.customers}
                  totalUsageGB={totalUsageGB}
                />
              </div>
            )}
          </>
        )}
      </MainBox>
    </div>
  );
};

export default UsageDashboard;
