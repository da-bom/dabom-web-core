import { QUERY_TIME, http } from '@shared';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import {
  FamilyUsageCurrent,
  FamilyUsageCurrentSchema,
  FamilyUsageMonthly,
  FamilyUsageMonthlySchema,
} from './scheme';

export const getFamilyUsage = async (year: number, month: number): Promise<FamilyUsageMonthly> => {
  const response = await http.get(`/families/usage/customers?year=${year}&month=${month}`);
  return FamilyUsageMonthlySchema.parse(response);
};

export const getFamilyUsageCurrent = async (): Promise<FamilyUsageCurrent> => {
  const response = await http.get('/families/usage/current');
  return FamilyUsageCurrentSchema.parse(response);
};

export const useGetFamilyUsage = (year: number, month: number) => {
  return useQuery<FamilyUsageMonthly, ApiErrorResponse>({
    queryKey: ['familyUsage', year, month],
    queryFn: () => getFamilyUsage(year, month),

    enabled:
      globalThis.window !== undefined && !!globalThis.window.localStorage.getItem('access_token'),
    placeholderData: keepPreviousData,
  });
};

export const useGetFamilyUsageCurrent = () => {
  return useQuery<FamilyUsageCurrent, ApiErrorResponse>({
    queryKey: ['familyUsageCurrent'],
    queryFn: getFamilyUsageCurrent,
    staleTime: QUERY_TIME.fiveMinutes,
    enabled:
      globalThis.window !== undefined && !!globalThis.window.localStorage.getItem('access_token'),
  });
};
