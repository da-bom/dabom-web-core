import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { MyPageInfoSchema } from './schema';

export const getMyPageInfo = async (year: number, month: number) => {
  const response = await http.get('/customers/mypage', {
    params: { year, month },
  });

  console.log(response);

  try {
    return MyPageInfoSchema.parse(response);
  } catch (error) {
    console.error('❌ 마이페이지 정보 파싱 실패:', error);
    throw error;
  }
};

export const useGetMyPage = (year: number, month: number) => {
  return useQuery({
    queryKey: ['myPage', year, month],
    queryFn: () => getMyPageInfo(year, month),
    enabled: !!year && !!month,
  });
};
