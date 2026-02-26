import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { PolicyDetail, PolicyDetailSchema } from './schema';

export const getPolicyDetail = async (policyId: number): Promise<PolicyDetail> => {
  const response = await http.get(`/policies/${policyId}`);
  return PolicyDetailSchema.parse(response);
};

export const useGetPolicyDetail = (policyId: number) => {
  return useQuery({
    queryKey: ['policyDetail', policyId],
    queryFn: () => getPolicyDetail(policyId),
    enabled: !!policyId,
  });
};
