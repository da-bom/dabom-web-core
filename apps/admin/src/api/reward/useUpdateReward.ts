import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RewardTemplateSchema, RewardUpdate } from './schema';

interface UpdateParams {
  id: number;
  payload: RewardUpdate;
}

export const updateRewardTemplate = async ({ id, payload }: UpdateParams) => {
  const response = await http.put(`/admin/rewards/templates/${id}`, payload);

  try {
    return RewardTemplateSchema.parse(response);
  } catch (error) {
    console.error('❌ 보상 수정 파싱 실패:', error);
    throw error;
  }
};

export const useUpdateReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRewardTemplate,
    onSuccess: (_, { id }) => {
      // 목록과 상세 쿼리 모두 무효화하여 최신 데이터 유지
      queryClient.invalidateQueries({ queryKey: ['rewardTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['rewardTemplate', id] });

      alert('보상이 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('수정 실패:', error);
      alert('보상 수정에 실패했습니다.');
    },
  });
};
