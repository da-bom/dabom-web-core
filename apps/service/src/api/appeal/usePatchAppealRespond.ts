import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import { showToast } from 'src/utils/toast';

import { AppealRespondRequest, AppealRespondResponseSchema } from './schema';

export const patchAppealRespond = async (appealId: number, data: AppealRespondRequest) => {
  const response = await http.patch(`/appeals/${appealId}/respond`, data);

  try {
    const parsed = AppealRespondResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 응답 Zod 파싱 실패:', error);
    throw error;
  }
};

export const usePatchAppealRespond = (appealId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppealRespondRequest) => patchAppealRespond(appealId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appeals'] });
      queryClient.invalidateQueries({ queryKey: ['appealDetail', appealId] });
    },
    onError: (error: ApiErrorResponse) => {
      showToast.error(error.errorMessage || '이의 제기 응답 처리에 실패했습니다.');
    },
  });
};
