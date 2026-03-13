import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteRewardTemplateResponseSchema } from './schema';

export const deleteRewardTemplate = async (id: number) => {
  const res = await http.delete(`/admin/rewards/templates/${id}`);

  return DeleteRewardTemplateResponseSchema.parse(res);
};

export const useDeleteRewardTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRewardTemplate(id),

    onSuccess: (parsedRes) => {
      if (parsedRes.success) {
        queryClient.invalidateQueries({ queryKey: ['rewardTemplates'] });
        queryClient.invalidateQueries({ queryKey: ['rewards'] });
      }
    },
    onError: (error) => {
      console.error('보상 삭제 실패:', error);
    },
  });
};
