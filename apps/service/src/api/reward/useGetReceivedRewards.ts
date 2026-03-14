import { http } from '@shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ReceivedRewardListSchema } from './schema';

export const getReceivedRewards = async ({
  cursor,
  size = 20,
}: {
  cursor?: string;
  size?: number;
}) => {
  const response = await http.get('/rewards/received', {
    params: { cursor, size },
  });

  try {
    return ReceivedRewardListSchema.parse(response);
  } catch (error) {
    console.error('❌ 보상 수령 내역 파싱 실패:', error);
    throw error;
  }
};

export const useGetReceivedRewards = (size = 20) => {
  return useInfiniteQuery({
    queryKey: ['receivedRewards', size],
    queryFn: ({ pageParam }) => getReceivedRewards({ cursor: pageParam, size }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
};
