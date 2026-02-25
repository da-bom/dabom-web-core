import { http } from "@shared";
import { useQuery } from "@tanstack/react-query";

import { PolicyDetailType } from "@shared/types/policyType";

export const getPolicyDetail = async (policyId: number) => {
  return (await http.get<PolicyDetailType>(
    `/policies/${policyId}`,
  )) as unknown as PolicyDetailType;
};

export const useGetPolicyDetail = (policyId: number) => {
  return useQuery({
    queryKey: ["policyDetail", policyId],
    queryFn: () => getPolicyDetail(policyId),
    enabled: !!policyId,
  });
};
