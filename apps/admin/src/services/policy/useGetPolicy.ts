import { http } from "@shared";
import { useQuery } from "@tanstack/react-query";

import { Policy, PolicyResponse, PolicyResponseSchema } from "./schema";

export const getPolicy = async (
  type: string,
  page: number,
): Promise<PolicyResponse> => {
  const response = await http.get("/policies", {
    params: { type, page, size: 10 },
  });

  return PolicyResponseSchema.parse(response);
};

export const useGetPolicy = (type: string, page: number) => {
  return useQuery<PolicyResponse, Error, Policy[]>({
    queryKey: ["policies", type, page],
    queryFn: () => getPolicy(type, page),
    enabled: !!type,
    select: (res) => res.policies,
  });
};
