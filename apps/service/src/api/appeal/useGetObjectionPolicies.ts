import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { ObjectionPoliciesResponseSchema } from './schema';

export const getObjectionPolicies = async () => {
  const response = await http.get('/appeals/policies');

  try {
    const parsed = ObjectionPoliciesResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 이의제기 정책 목록 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetObjectionPolicies = () => {
  return useQuery({
    queryKey: ['objectionPolicies'],
    queryFn: () => getObjectionPolicies(),
  });
};
