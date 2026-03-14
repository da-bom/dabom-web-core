import { useMutation } from '@tanstack/react-query';

import { ImageUploadResponseSchema } from '../api/upload/schema';
import { http } from '../utils/http';

export type UploadType = 'REWARD' | 'PROFILE' | 'MISSION';

export const uploadImage = async (file: File, type: UploadType = 'REWARD') => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await http.post(`/uploads/images?type=${type}`, formData, {
    timeout: 60000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  try {
    const parsed = ImageUploadResponseSchema.parse(response);
    return parsed.url;
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ file, type }: { file: File; type?: UploadType }) => uploadImage(file, type),
    onSuccess: (url) => {
      console.log('✅ 업로드 완료 URL:', url);
    },
    onError: () => {
      alert('이미지 업로드에 실패했습니다.');
    },
  });
};
