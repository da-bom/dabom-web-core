import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MissionRequestResponseSchema } from './schema';

export const requestMissionApproval = async (missionId: number) => {
  const response = await http.post(`/missions/${missionId}/request`);

  try {
    const parsed = MissionRequestResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 미션 요청 파싱 실패:', error);
    throw error;
  }
};

export const useRequestMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: number) => requestMissionApproval(missionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      alert('미션 완료 요청을 보냈습니다!');
    },
    onError: () => {
      alert('미션 요청에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
