import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import {
  RewardGrantListResponseSchema,
  RewardGrantParams,
  RewardGrantParamsSchema,
} from './schema';

export const getRewardGrants = async (params: RewardGrantParams) => {
  const validatedParams = RewardGrantParamsSchema.parse(params);

  const response = await http.get('/admin/rewards/grants', {
    params: validatedParams,
  });

  try {
    return RewardGrantListResponseSchema.parse(response);
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetRewardGrants = (params: RewardGrantParams) => {
  return useQuery({
    queryKey: ['rewardGrants', params],
    queryFn: () => getRewardGrants(params),
  });
};
