import { http } from "@shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiErrorResponse } from "@shared/types/error";
import {
  AppBlock,
  ManualBlock,
  MonthlyBlock,
  TimeBlock,
} from "@shared/types/policyType";

interface PolicyUpdateRequest {
  description: string;
  requireRole: "OWNER" | "ADMIN" | "MEMBER";
  defaultRules: MonthlyBlock | TimeBlock | ManualBlock | AppBlock;
  isActive: boolean;
  overWrite: boolean;
}

interface PolicyUpdateResponse {
  success: boolean;
  data: {
    policyId: number;
    updatedAt: string;
  };
}

export const updatePolicy = async (
  policyId: number,
  data: PolicyUpdateRequest,
) => {
  const response = await http.post<PolicyUpdateResponse>(
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
