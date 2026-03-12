import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AppealCreateRequest, AppealCreateResponseSchema } from './schema';

export const postAppeal = async (data: AppealCreateRequest) => {
  console.log('🌐 일반 이의제기 요청 API 호출: /appeals', data);

  const response = await http.post('/appeals', data);

  console.log('✅ 일반 이의제기 요청 성공:', response);

  try {
    const parsed = AppealCreateResponseSchema.parse(response);
    return parsed.data;
  } catch (error) {
    console.error('❌ 일반 이의제기 요청 Zod 파싱 실패:', error);
    throw error;
  }
};

export const usePostAppeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppealCreateRequest) => postAppeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appeals'] });
    },
  });
};
