import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { FamilyResponseSchema, FamilySearchRequest, FamilySearchRequestSchema } from './schema';

export const getFamilies = async (params: FamilySearchRequest) => {
  const validatedParams = FamilySearchRequestSchema.parse(params);
  const response = await http.post('/families', validatedParams);

  return FamilyResponseSchema.parse(response);
};

export const useGetFamilies = (params: FamilySearchRequest) => {
  return useQuery({
    queryKey: ['families', params ?? 'all'],
    queryFn: () => getFamilies(params),
    placeholderData: (prev) => prev,
  });
};
