import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateFamilyRequest, UpdateFamilyResponse, UpdateFamilyResponseSchema } from './schema';

export const updateFamily = async (
  familyId: number,
  body: UpdateFamilyRequest,
): Promise<UpdateFamilyResponse> => {
  try {
    const response = await http.patch<UpdateFamilyResponse & { timestamp?: string }>(
      `/admin/families/${familyId}`,
      body,
    );

    try {
      const parsedData = UpdateFamilyResponseSchema.parse(response);

      return parsedData;
    } catch (zodError) {
      console.error('❌ [Update Family API] Zod 파싱 실패:', zodError);
      throw zodError;
    }
  } catch (error) {
    console.error('❌ [Update Family API] 요청 에러:', error);
    throw error;
  }
};

export const useUpdateFamily = (familyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateFamilyRequest) => updateFamily(familyId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['families'] });
      queryClient.invalidateQueries({ queryKey: ['family', familyId] });
    },
    onError: (error: Error) => {
      alert(error.message || '수정 중 오류가 발생했습니다.');
    },
  });
};
