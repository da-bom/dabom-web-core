import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { MissionRequest, MissionRequestSchema, MissionResponseSchema } from './schema';

export const getMissions = async (params: MissionRequest) => {
  const validatedParams = MissionRequestSchema.parse(params);

  const response = await http.get('/missions', {
    params: validatedParams,
  });

  try {
    const parsed = MissionResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ Mission Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetMissions = (params: MissionRequest) => {
  return useQuery({
    queryKey: ['missions', params],
    queryFn: () => getMissions(params),
    placeholderData: (prev) => prev,
  });
};
