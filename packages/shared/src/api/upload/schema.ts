import { z } from 'zod';

export const ImageUploadResponseSchema = z.object({
  url: z.string().url('유효하지 않은 이미지 URL입니다.'),
});

export type ImageUploadResponse = z.infer<typeof ImageUploadResponseSchema>;
