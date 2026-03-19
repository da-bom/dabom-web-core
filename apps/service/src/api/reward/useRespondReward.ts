import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from 'src/utils/toast';

import { RespondRewardDataSchema } from './schema';

interface RespondPayload {
  status: 'APPROVED' | 'REJECTED';
  rejectReason?: string;
}

export const respondRewardRequest = async ({
  requestId,
  payload,
}: {
  requestId: number;
  payload: RespondPayload;
}) => {
  const response = await http.put(`/rewards/requests/${requestId}/respond`, payload);

  try {
    return RespondRewardDataSchema.parse(response);
  } catch (error) {
    console.error('❌ 보상 응답 처리 파싱 실패:', error);
    throw error;
  }
};

export const useRespondReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondRewardRequest,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['rewardRequests'] }),
        queryClient.invalidateQueries({ queryKey: ['receivedRewards'] }),
        queryClient.invalidateQueries({ queryKey: ['missions'] }),
      ]);
      showToast.success('요청이 처리되었습니다!');
    },
    onError: (error) => {
      console.error('보상 처리 실패:', error);
      showToast.error('보상 처리에 실패했습니다.');
    },
  });
};
