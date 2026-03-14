import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import { AppealCreateRequest, AppealCreateResponseSchema } from './schema';

export const postAppeal = async (data: AppealCreateRequest) => {
  const response = await http.post('/appeals', data);

  try {
    const parsed = AppealCreateResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 생성 Zod 파싱 실패:', error);
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
    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage || '이의 제기 생성에 실패했습니다.');
    },
  });
};
