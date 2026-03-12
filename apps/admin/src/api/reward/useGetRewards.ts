import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { RewardTemplate, RewardTemplateSchema } from './schema';

export const getRewardTemplates = async (): Promise<RewardTemplate[]> => {
  const response = await http.get('/admin/rewards/templates');

  try {
    // 1. 배열 스키마를 사용하여 response를 직접 파싱
    // http.get이 반환하는 타입과 상충하지 않도록 z.array().parse()만 사용합니다.
    return z.array(RewardTemplateSchema).parse(response);
  } catch (error) {
    console.error('❌ 보상 템플릿 Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetRewardTemplates = () => {
  return useQuery({
    queryKey: ['rewardTemplates'],
    queryFn: getRewardTemplates,
  });
};
