import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { RewardTemplateListSchema } from './schema';

export const getRewardTemplates = async (category: 'DATA' | 'GIFTICON') => {
  const response = await http.get('/rewards/templates', {
    params: { category },
  });

  try {
    return RewardTemplateListSchema.parse(response);
  } catch (error) {
    console.error(`❌ 보상 템플릿(${category}) 목록 파싱 실패:`, error);
    throw error;
  }
};

export const useGetRewardTemplates = (category: 'DATA' | 'GIFTICON') => {
  return useQuery({
    queryKey: ['rewardTemplates', category],
    queryFn: () => getRewardTemplates(category),
    enabled: !!category,
  });
};
