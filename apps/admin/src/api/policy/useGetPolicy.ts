import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { Policy, PolicyResponse, PolicyResponseSchema } from './schema';

export const getPolicy = async (page: number): Promise<PolicyResponse> => {
  const response = await http.get('/policies', {
    params: { page, size: 10 },
  });

  try {
    const parsed = PolicyResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetPolicy = (page: number) => {
  return useQuery<PolicyResponse, Error, Policy[]>({
    queryKey: ['policies', page],
    queryFn: () => getPolicy(page),
    select: (res) => res.policies,
  });
};
