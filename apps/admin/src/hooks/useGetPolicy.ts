import { http } from "@shared";
import { useQuery } from "@tanstack/react-query";

import { PolicyType } from "@shared/types/policyType";

interface PolicyResponse {
  page: number;
  policies: PolicyType[];
  size: number;
  totalElements: number;
  totalPages: number;
}

export const getPolicy = async (
  type: string,
  page: number,
): Promise<PolicyResponse> => {
  const response = await http.get<PolicyResponse>("/policies", {
    params: {
      type,
      page,
      size: 10,
    },
  });

  return response as unknown as PolicyResponse;
};

export const useGetPolicy = (type: string, page: number) => {
  return useQuery<PolicyResponse, Error, PolicyType[]>({
    queryKey: ["policies", type, page],
    queryFn: () => getPolicy(type, page),
    enabled: !!type,
    select: (res) => res.policies,
  });
};
