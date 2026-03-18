import { http } from '@shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/type/error';

import { showToast } from 'src/utils/toast';

import { CreateCommentRequest, CreateCommentResponseSchema } from './schema';

export const postComment = async (appealId: number, data: CreateCommentRequest) => {
  const response = await http.post(`/appeals/${appealId}/comments`, data);

  try {
    const parsed = CreateCommentResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ 댓글 작성 Zod 파싱 실패:', error);
    throw error;
  }
};

export const usePostComment = (appealId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => postComment(appealId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appealDetail', appealId] });
    },
    onError: (error: ApiErrorResponse) => {
      showToast.error(error.errorMessage || '댓글 작성에 실패했습니다.');
    },
  });
};
