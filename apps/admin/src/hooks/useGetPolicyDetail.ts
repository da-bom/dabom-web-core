import { http } from "@shared";
import { useQuery } from "@tanstack/react-query";

import { PolicyDetailType } from "@shared/types/policyType";

interface PolicyDetailResponse {
  success: boolean;
  data: PolicyDetailType;
}

export const getPolicyDetail = async (policyId: number) => {
  const response = await http.get<PolicyDetailResponse>(
    `/policies/${policyId}`,
  );
  return response as unknown as PolicyDetailResponse;
};

export const useGetPolicyDetail = (policyId: number) => {
  return useQuery({
    queryKey: ["policyDetail", policyId],
    queryFn: () => getPolicyDetail(policyId),
    enabled: !!policyId,

    select: (response) => response.data,
  });
};
