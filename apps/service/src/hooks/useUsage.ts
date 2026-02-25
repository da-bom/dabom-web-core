"use client";

import { useEffect } from "react";

import { QUERY_STALE_TIME, http, sseClient } from "@shared";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  FamilyCurrentUsageResponse,
  FamilyCustomersUsageResponse,
  SSEFamilyUsageUpdateResponse,
  SSEUsageUpdatedResponse,
  ServiceUsageResponse,
} from "src/types/usageType";

import { ApiErrorResponse } from "@shared/type/error";

export const getFamilyCurrentUsage = async () => {
  const response = await http.get<
    ServiceUsageResponse<FamilyCurrentUsageResponse>
  >(`/families/usage/current`);

  return response as unknown as FamilyCurrentUsageResponse;
};

export const useGetFamilyCurrentUsage = () => {
  return useQuery<FamilyCurrentUsageResponse, ApiErrorResponse>({
    queryKey: ["familyCurrentUsage"],
    queryFn: getFamilyCurrentUsage,
    staleTime: QUERY_STALE_TIME.fiveMinutes,
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("access_token"),
  });
};

export const getFamilyCustomersUsage = async (year: number, month: number) => {
  const response = await http.get<
    ServiceUsageResponse<FamilyCustomersUsageResponse>
  >(`/families/usage/customers?year=${year}&month=${month}`);

  return response as unknown as FamilyCustomersUsageResponse;
};

export const useGetFamilyCustomersUsage = (year: number, month: number) => {
  return useQuery<FamilyCustomersUsageResponse, ApiErrorResponse>({
    queryKey: ["familyCustomersUsage", year, month],
    queryFn: () => getFamilyCustomersUsage(year, month),
    staleTime: QUERY_STALE_TIME.fiveMinutes,
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("access_token"),
    placeholderData: keepPreviousData,
  });
};

export const connectUsageSSE = (
  customerId: number,
  onMessage: (eventName: string, rawData: string) => void,
  signal: AbortSignal,
) => {
  const ENDPOINT = `/notification-proxy/families/usage/sse?customerId=${customerId}`;
  return sseClient.connect(ENDPOINT, onMessage, signal);
};

export const useSSE = (
  enabled: boolean,
  customerId: number,
  year: number,
  month: number,
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !customerId) return;

    const abortController = new AbortController();

    connectUsageSSE(
      customerId,
      (eventName, rawData) => {
        const parsedData = JSON.parse(rawData);

        if (eventName === "usage-updated") {
          const data = parsedData as SSEUsageUpdatedResponse;

          queryClient.setQueryData<FamilyCurrentUsageResponse>(
            ["familyCurrentUsage"],
            (oldData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                totalQuotaBytes: data.totalLimitBytes,
                remainingBytes: data.remainingBytes,
              };
            },
          );
        } else if (eventName === "usage-update-by-member") {
          const data = parsedData as SSEFamilyUsageUpdateResponse;

          queryClient.setQueryData<FamilyCustomersUsageResponse>(
            ["familyCustomersUsage", year, month],
            (oldData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                customers: oldData.customers.map((customer) =>
                  customer.customerId === data.customerId
                    ? { ...customer, monthlyUsedBytes: data.monthlyUsedBytes }
                    : customer,
                ),
              };
            },
          );
        }
      },
      abortController.signal,
    ).catch((error) => console.error("SSE 연결 실패:", error));

    return () => {
      abortController.abort();
    };
  }, [enabled, customerId, year, month, queryClient]);
};
