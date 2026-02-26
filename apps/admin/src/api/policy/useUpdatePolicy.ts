import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/types/error';

import { PolicyUpdateRequest, PolicyUpdateResponse, PolicyUpdateResponseSchema } from './schema';

export const updatePolicy = async (
  policyId: number,
  data: PolicyUpdateRequest,
): Promise<PolicyUpdateResponse> => {
  const response = await http.put(`/policies/${policyId}`, data);

  try {
    return PolicyUpdateResponseSchema.parse(response);
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ policyId, data }: { policyId: number; data: PolicyUpdateRequest }) =>
      updatePolicy(policyId, data),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['policyDetail', variables.policyId],
      });
      alert('정책이 성공적으로 수정되었습니다.');
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage || '수정 중 오류가 발생했습니다.');
    },
  });
};
