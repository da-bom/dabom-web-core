import { http } from '@shared';
import { useMutation } from '@tanstack/react-query';

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

  return ServiceLoginResponseSchema.parse(response);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ phoneNumber, password }: ServiceLoginRequest) => login(phoneNumber, password),

    onSuccess: (data: ServiceLoginResponse) => {
      if (globalThis.window !== undefined) {
        globalThis.window.localStorage.setItem('access_token', data.accessToken);
        globalThis.window.localStorage.setItem('refresh_token', data.refreshToken);
      }
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
