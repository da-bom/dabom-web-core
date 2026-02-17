import { useRouter } from "next/navigation";

import { http } from "@shared";
import { useMutation } from "@tanstack/react-query";
import { ServiceLoginRequest, ServiceLoginResponse } from "src/types/LoginType";

import { ApiErrorResponse } from "@shared/type/error";

export const login = async (phone: string, password: string) => {
  const response = await http.post<ServiceLoginResponse>("/customer/login", {
    phone,
    password,
  });
  return response as unknown as ServiceLoginResponse;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ phone, password }: ServiceLoginRequest) =>
      login(phone, password),

    onSuccess: (data: ServiceLoginResponse) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);

      router.push("/home");
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
