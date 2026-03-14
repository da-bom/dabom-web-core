import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { RewardTemplate, RewardTemplateSchema } from './schema';

export const getRewardTemplates = async (): Promise<RewardTemplate[]> => {
  const response = await http.get('/admin/rewards/templates');

  try {
    return z.array(RewardTemplateSchema).parse(response);
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetRewardTemplates = () => {
  return useQuery({
    queryKey: ['rewardTemplates'],
    queryFn: getRewardTemplates,
  });
};
