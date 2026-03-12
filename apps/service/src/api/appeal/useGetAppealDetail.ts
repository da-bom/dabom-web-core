import { http } from '@shared';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { AppealDetailSchema } from './schema';

export const getAppealDetail = async (appealId: number) => {
  console.log(`🌐 이의제기 상세 API 요청: /appeals/${appealId}`);

  const response = await http.get(`/appeals/${appealId}`);

  console.log('✅ 이의제기 상세 API 응답 성공:', response);

  try {
    const parsed = AppealDetailSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 상세 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetAppealDetail = (appealId: number) => {
  return useQuery({
    queryKey: ['appealDetail', appealId],
    queryFn: () => getAppealDetail(appealId),
    enabled: !!appealId,
  });
};

export const useSuspenseGetAppealDetail = (appealId: number) => {
  return useSuspenseQuery({
    queryKey: ['appealDetail', appealId],
    queryFn: () => getAppealDetail(appealId),
  });
};
