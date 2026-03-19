import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { DashboardData, DashboardDataSchema } from './schema';

export type DashboardResponse = DashboardData & { timestamp: string };

const getDashboard = async (): Promise<DashboardData & { timestamp: string }> => {
  try {
    const response = await http.get('/admin/dashboard');
    const parsed = DashboardDataSchema.passthrough().parse(response);
    return parsed as DashboardResponse;
  } catch (error) {
    if (error instanceof (await import('zod')).ZodError) {
      console.error('❌ [Dashboard API] Zod 파싱 실패:', error);
    } else {
      console.error('❌ [Dashboard API] 데이터 페칭 에러:', error);
    }
    throw error;
  }
};

export const useGetDashboard = <T = DashboardData & { timestamp: string }>(
  select?: (data: DashboardData & { timestamp: string }) => T,
) => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboard,
    select,
  });
};
