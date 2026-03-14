import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, http } from '@shared';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';

import { ApiErrorResponse } from '@shared/type/error';

import { ServiceLoginRequest, ServiceLoginResponse, ServiceLoginResponseSchema } from './schema';

export const login = async (
  phoneNumber: string,
  password: string,
): Promise<ServiceLoginResponse> => {
  const response = await http.post('/customers/login', {
    phoneNumber,
    password,
  });

  try {
    const parsed = ServiceLoginResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useServiceLogin = () => {
  return useMutation({
    mutationFn: ({ phoneNumber, password }: ServiceLoginRequest) => login(phoneNumber, password),

    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      setCookie(ACCESS_TOKEN_KEY, data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24,
      });
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
