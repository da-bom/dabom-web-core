import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { AppealListResponseSchema } from './schema';

export const getAppeals = async (cursor?: string, size: number = 20) => {
  console.log(`🌐 이의제기 목록 API 요청: /appeals?cursor=${cursor}&size=${size}`);

  const response = await http.get('/appeals', {
    params: {
      cursor,
      size,
    },
  });

  console.log('✅ 이의제기 목록 API 응답 성공:', response);

  try {
    const parsed = AppealListResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 목록 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetAppeals = (cursor?: string, size?: number) => {
  return useQuery({
    queryKey: ['appeals', cursor, size],
    queryFn: () => getAppeals(cursor, size),
  });
};
