import { http } from '@shared';
import { useQuery } from '@tanstack/react-query';

import { CustomerMe, customerMeSchema } from './schema';

export const getCustomerMe = async (): Promise<CustomerMe> => {
  const response = await http.get('/customers/me');

  try {
    const result = customerMeSchema.safeParse(response);

    if (!result.success) {
      console.error('❌ 내 정보 API Response Type Error:', result.error);
      throw new Error('내 정보 데이터 형식이 올바르지 않습니다.');
    }

    return result.data;
  } catch (error) {
    console.error('❌ getCustomerMe 실행 중 에러 발생:', error);
    throw error;
  }
};

export const useCustomerMe = () => {
  return useQuery({
    queryKey: ['customer', 'me'],
    queryFn: getCustomerMe,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    notifyOnChangeProps: ['data', 'error'],
    staleTime: 0,
  });
};
