import { QUERY_TIME, http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';
import { CustomerDetail } from '@shared/type/familyType';

import { FamilyDetail, FamilyPoliciesDataSchema } from './scheme';

export const getFamilyPolicies = async (): Promise<FamilyDetail> => {
  const response = await http.get('/families/policies');
  const familyData = FamilyPoliciesDataSchema.parse(response);

  const mappedCustomers: CustomerDetail[] = familyData.customers.map((c) => {
    const monthlyPolicy = c.policies.find((p) => p.type === 'MONTHLY_LIMIT');

    return {
      customerId: c.customerId,
      name: c.name,
      phoneNumber: c.phoneNumber,
      role: c.role,
      monthlyUsedBytes: c.usedBytes,
      monthlyLimitBytes: monthlyPolicy?.rules?.limitBytes ?? 0,
    };
  });

  return {
    familyId: familyData.familyId,
    familyName: '다봄 가족스',
    createdById: 0,
    customers: mappedCustomers,
    totalQuotaBytes: familyData.totalQuotaBytes,
    currentMonth: '',
    createdAt: '',
    updatedAt: '',
  };
};

export const useGetFamilyPolicies = () => {
  return useQuery<FamilyDetail, ApiErrorResponse>({
    queryKey: ['familyPolicies'],
    queryFn: getFamilyPolicies,
    staleTime: QUERY_TIME.fiveMinutes,
    enabled:
      globalThis.window !== undefined && !!globalThis.window.localStorage.getItem('access_token'),
  });
};
