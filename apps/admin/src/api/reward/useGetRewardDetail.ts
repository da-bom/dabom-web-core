import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { RewardTemplateSchema } from './schema';

export const getRewardDetail = async (id: number) => {
  const response = await http.get(`/admin/rewards/templates/${id}`);

  try {
    return RewardTemplateSchema.parse(response);
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetRewardDetail = (id: number) => {
  return useQuery({
    queryKey: ['rewardTemplate', id],
    queryFn: () => getRewardDetail(id),
    enabled: !!id,
  });
};
