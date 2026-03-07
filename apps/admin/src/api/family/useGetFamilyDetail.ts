import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { FamilyDetailDataSchema } from './schema';

export const getFamilyDetail = async (familyId: number) => {
  if (!familyId) return null;
  const response = await http.get(`/admin/families/${familyId}`);

  try {
    const parsed = FamilyDetailDataSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useGetFamilyDetail = (familyId: number | undefined) => {
  return useQuery({
    queryKey: ['familyDetail', familyId],
    queryFn: () => getFamilyDetail(familyId as number),
    enabled: !!familyId,
  });
};
