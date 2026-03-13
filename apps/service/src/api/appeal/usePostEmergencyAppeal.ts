import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EmergencyAppealResponseSchema } from './schema';

export const EMERGENCY_ADDITIONAL_BYTES = 314572800;

export const postEmergencyAppeal = async (requestReason: string) => {
  console.log('🌐 긴급 쿼터 요청 API 호출: /appeals/emergency', {
    requestReason,
    additionalBytes: EMERGENCY_ADDITIONAL_BYTES,
  });

  const response = await http.post('/appeals/emergency', {
    requestReason,
    additionalBytes: EMERGENCY_ADDITIONAL_BYTES,
  });

  console.log('✅ 긴급 쿼터 요청 성공:', response);

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
    },
  });
};
