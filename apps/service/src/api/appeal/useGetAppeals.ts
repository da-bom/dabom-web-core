import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { AppealListResponseSchema } from './schema';

export const getAppeals = async (status?: string, cursor?: string, size: number = 20) => {
  const response = await http.get('/appeals', {
    params: {
      status,
      cursor,
      size,
    },
  });

  try {
    const parsed = AppealListResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 목록 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetAppeals = (status?: string, cursor?: string, size?: number) => {
  return useQuery({
    queryKey: ['appeals', status, cursor, size],
    queryFn: () => getAppeals(status, cursor, size),
  });
};
