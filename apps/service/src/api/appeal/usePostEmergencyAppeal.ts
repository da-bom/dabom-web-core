import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import { showToast } from 'src/utils/toast';

import { EmergencyAppealResponseSchema } from './schema';

export const postEmergencyAppeal = async (requestReason: string) => {
  const response = await http.post('/appeals/emergency', {
    requestReason,
  });

  try {
    const parsed = EmergencyAppealResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 긴급 쿼터 요청 Zod 파싱 실패:', error);
    throw error;
  }
};

export const usePostEmergencyAppeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestReason: string) => postEmergencyAppeal(requestReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appeals'] });
      queryClient.invalidateQueries({ queryKey: ['familyPolicies'] });
    },
    onError: (error: ApiErrorResponse) => {
      showToast.error(error.errorMessage || '긴급 요청에 실패했습니다.');
    },
  });
};
