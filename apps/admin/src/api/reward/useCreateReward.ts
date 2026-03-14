import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RewardCreate, RewardTemplateSchema } from './schema';

export const createRewardTemplate = async (payload: RewardCreate) => {
  const response = await http.post('/admin/rewards/templates', payload);

  try {
    return RewardTemplateSchema.parse(response);
  } catch (error) {
    console.error('❌ 보상 생성 파싱 실패:', error);
    throw error;
  }
};

export const useCreateReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRewardTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewardTemplates'] });
      alert('보상이 성공적으로 추가되었습니다.');
    },
    onError: (error) => {
      console.error('생성 실패:', error);
      alert('보상 추가에 실패했습니다.');
    },
  });
};
