import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from 'src/utils/toast';

import { MissionCreate } from './schema';

export const useCreateMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MissionCreate) => {
      const response = await http.post('/missions', payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      showToast.success('미션이 성공적으로 생성되었습니다!');
    },
  });
};
