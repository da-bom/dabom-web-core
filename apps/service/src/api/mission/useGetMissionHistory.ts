import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { MissionHistoryData, MissionHistoryDataSchema, MissionRequest } from './schema';

export const getMissionHistory = async (params: MissionRequest): Promise<MissionHistoryData> => {
  const response = await http.get('/missions/history', { params });

  try {
    return MissionHistoryDataSchema.parse(response);
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetMissionHistory = (params: MissionRequest) => {
  return useQuery<MissionHistoryData>({
    queryKey: ['missionHistory', params],
    queryFn: () => getMissionHistory(params),
  });
};
