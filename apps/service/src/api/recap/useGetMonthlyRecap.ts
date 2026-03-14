import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { MonthlyRecapResponseSchema } from './schema';

export const getMonthlyRecap = async (year: number, month: number) => {
  const response = await http.get('/recaps/monthly', {
    params: {
      year,
      month,
    },
  });

  try {
    return MonthlyRecapResponseSchema.parse(response);
  } catch (error) {
    console.error('❌ 월간 리캡 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetMonthlyRecap = (year: number, month: number) => {
  return useQuery({
    queryKey: ['monthlyRecap', year, month],
    queryFn: () => getMonthlyRecap(year, month),
  });
};
