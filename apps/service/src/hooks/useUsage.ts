"use client";

import { useEffect, useState } from "react";

import { QUERY_STALE_TIME, http, sseClient } from "@shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  FamilyUsageData,
  ServiceUsageResponse,
  UsageSSEData,
} from "src/types/usageType";

import { ApiErrorResponse } from "@shared/type/error";

export const getFamilyUsage = async (year: number, month: number) => {
  const response = await http.get<ServiceUsageResponse<FamilyUsageData>>(
    `/families/reports/usage?year=${year}&month=${month}`,
  );

  return response as unknown as FamilyUsageData;
};

export const connectUsageSSE = (
  onMessage: (data: UsageSSEData) => void,
  signal: AbortSignal,
) => {
  const ENDPOINT = "/families/usage/sse";

  return sseClient.connect<UsageSSEData>(ENDPOINT, onMessage, signal);
};

export const useGetFamilyUsage = (year: number, month: number) => {
  return useQuery<FamilyUsageData, ApiErrorResponse>({
    queryKey: ["familyUsage", year, month],
    queryFn: () => getFamilyUsage(year, month),
    staleTime: QUERY_STALE_TIME.fiveMinutes,
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("access_token"),

    placeholderData: keepPreviousData,
  });
};

export const useSSE = (enabled: boolean) => {
  const [realtimeData, setRealtimeData] = useState<UsageSSEData | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const abortController = new AbortController();

    connectUsageSSE(
      (data) => setRealtimeData(data),
      abortController.signal,
    ).catch((error) => console.error("SSE 초기화 실패:", error));

    return () => {
      abortController.abort();
    };
  }, [enabled]);

  return realtimeData;
};
