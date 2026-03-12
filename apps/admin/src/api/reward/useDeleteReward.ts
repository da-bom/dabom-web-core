import { useRouter } from 'next/navigation';

import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteRewardTemplate = async (id: number) => {
  return await http.delete(`/admin/rewards/templates/${id}`);
};

export const useDeleteReward = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteRewardTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewardTemplates'] });

      alert('보상이 삭제되었습니다.');
      router.back();
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('보상 삭제에 실패했습니다.');
    },
  });
};
