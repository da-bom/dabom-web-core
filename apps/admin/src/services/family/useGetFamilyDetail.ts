import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { FamilyDetailDataSchema } from './schema';

export const getFamilyDetail = async (familyId: number) => {
  if (!familyId) return null;
  const response = await http.get(`/families/${familyId}`);
  return FamilyDetailDataSchema.parse(response);
};

export const useGetFamilyDetail = (familyId: number | undefined) => {
  return useQuery({
    queryKey: ['familyDetail', familyId],
    queryFn: () => getFamilyDetail(familyId as number),
    enabled: !!familyId,
  });
};
