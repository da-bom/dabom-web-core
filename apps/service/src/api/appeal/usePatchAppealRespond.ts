import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AppealRespondRequest,
  AppealRespondResponseSchema,
  AppealRespondResultSchema,
} from './schema';

export const patchAppealRespond = async (appealId: number, data: AppealRespondRequest) => {
  console.log(`🌐 이의제기 응답 API 호출: /appeals/${appealId}/respond`, data);

  const response = await http.patch(`/appeals/${appealId}/respond`, data);

  console.log('✅ 이의제기 응답 성공 응답:', response);

  try {
    const fullParsed = AppealRespondResponseSchema.safeParse(response);
    if (fullParsed.success) {
      return fullParsed.data.data;
    }

    return AppealRespondResultSchema.parse(response);
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
  });
};
