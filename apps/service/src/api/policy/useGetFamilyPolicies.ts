import { QUERY_TIME, http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import { formatFamilyPolicies } from 'src/utils/formatPolicy';

import { FamilyDetail, FamilyPoliciesData, FamilyPoliciesDataSchema } from './schema';

export const getFamilyPolicies = async (): Promise<FamilyPoliciesData> => {
  const response = await http.get('/families/policies');
  return FamilyPoliciesDataSchema.parse(response);
};

export const useGetFamilyPolicies = () => {
  return useQuery<FamilyPoliciesData, ApiErrorResponse, FamilyDetail>({
    queryKey: ['familyPolicies'],
    queryFn: getFamilyPolicies,
    staleTime: QUERY_TIME.fiveMinutes,
    enabled:
      globalThis.window !== undefined && !!globalThis.window.localStorage.getItem('access_token'),
    select: (data) => formatFamilyPolicies(data),
  });
};
