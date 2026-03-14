import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateFamilyNameResponseSchema } from './schema';

export const updateFamilyName = async (name: string) => {
  const response = await http.put('/families', { name });

  try {
    return UpdateFamilyNameResponseSchema.parse(response);
  } catch (error) {
    console.error('❌ 가족 이름 수정 파싱 실패:', error);
    throw error;
  }
};

export const useUpdateFamilyName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFamilyName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPage'] });
    },
    onError: (error) => {
      console.error('가족 이름 수정 실패:', error);
    },
  });
};
