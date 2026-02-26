import { QUERY_STALE_TIME, http } from "@shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@shared/type/error";

import { FamilyUsageData, FamilyUsageDataSchema } from "./scheme";

export const getFamilyUsage = async (
  year: number,
  month: number,
): Promise<FamilyUsageData> => {
  const response = await http.get(
    `/families/usage/customers?year=${year}&month=${month}`,
  );

  const parsedData = FamilyUsageDataSchema.parse(response);

  return parsedData;
};

export const useGetFamilyUsage = (year: number, month: number) => {
  return useQuery<FamilyUsageData, ApiErrorResponse>({
    queryKey: ["familyUsage", year, month],
    queryFn: () => getFamilyUsage(year, month),
    staleTime: QUERY_STALE_TIME.fiveMinutes,
    enabled:
      globalThis.window !== undefined &&
      !!globalThis.window.localStorage.getItem("access_token"),
    placeholderData: keepPreviousData,
  });
};
