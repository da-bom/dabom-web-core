import { http } from "@shared";
import { useMutation } from "@tanstack/react-query";
import { ServiceLoginRequest, ServiceLoginResponse } from "src/types/LoginType";

import { ApiErrorResponse } from "@shared/type/error";

export const login = async (phoneNumber: string, password: string) => {
  const response = await http.post<ServiceLoginResponse>("/customers/login", {
    phoneNumber,
    password,
  });
  return response as unknown as ServiceLoginResponse;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ phoneNumber, password }: ServiceLoginRequest) =>
      login(phoneNumber, password),

    onSuccess: (data: ServiceLoginResponse) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
