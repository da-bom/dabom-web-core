import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { AppealDetailResponseSchema } from './schema';

export const getAppealDetail = async (appealId: number, cursor?: string, size: number = 20) => {
  const response = await http.get(`/appeals/${appealId}`, {
    params: {
      cursor,
      size,
    },
  });

  try {
    const parsed = AppealDetailResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 상세 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetAppealDetail = (appealId: number, cursor?: string, size?: number) => {
  return useQuery({
    queryKey: ['appealDetail', appealId, cursor, size],
    queryFn: () => getAppealDetail(appealId, cursor, size),
    enabled: !!appealId,
  });
};
