import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { FamilyMemberListSchema } from './schema';

export const getFamilyMembers = async () => {
  const response = await http.get('/families/members');

  try {
    return FamilyMemberListSchema.parse(response);
  } catch (error) {
    console.error('❌ 가족 구성원 목록 파싱 실패:', error);
    throw error;
  }
};

export const useGetFamilyMembers = () => {
  return useQuery({
    queryKey: ['familyMembers'],
    queryFn: getFamilyMembers,
  });
};
