import { http } from "@shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiErrorResponse } from "@shared/types/error";
import {
  APP_BLOCK,
  MANUAL_BLOCK,
  MONTHLY_LIMIT,
  TIME_BLOCK,
} from "@shared/types/policyType";

interface PolicyUpdateRequest {
  description: string;
  requiredRole: "OWNER" | "ADMIN" | "MEMBER";
  defaultRules: MONTHLY_LIMIT | TIME_BLOCK | MANUAL_BLOCK | APP_BLOCK;
  isActive: boolean;
  overWrite: boolean;
}

interface PolicyUpdateResponse {
  policyId: number;
  updatedAt: string;
}

export const updatePolicy = async (
  policyId: number,
  data: PolicyUpdateRequest,
) => {
  const response = await http.put<PolicyUpdateResponse>(
    `/policies/${policyId}`,
    data,
  );
  return response as unknown as PolicyUpdateResponse;
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      policyId,
      data,
    }: {
      policyId: number;
      data: PolicyUpdateRequest;
    }) => updatePolicy(policyId, data),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["policyDetail", variables.policyId],
      });
      alert("정책이 성공적으로 수정되었습니다.");
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage || "수정 중 오류가 발생했습니다.");
    },
  });
};
