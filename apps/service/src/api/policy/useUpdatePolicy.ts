import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import { showToast } from 'src/utils/toast';

import { UpdatePolicyRequest, UpdatePolicyResponse, UpdatePolicyResponseSchema } from './schema';

export const updatePolicy = async (payload: UpdatePolicyRequest): Promise<UpdatePolicyResponse> => {
  const response = await http.patch('families/policies', payload);
  return UpdatePolicyResponseSchema.parse(response);
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdatePolicyResponse, ApiErrorResponse, UpdatePolicyRequest>({
    mutationFn: (payload) => updatePolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicies'] });
    },
    onError: (error: ApiErrorResponse) => {
      showToast.error(error.errorMessage || '정책 수정에 실패했습니다.');
    },
  });
};
