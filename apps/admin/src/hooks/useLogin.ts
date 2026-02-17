import { useRouter } from "next/router";

import { http } from "@shared";
import { useMutation } from "@tanstack/react-query";
import { AdminLoginRequest, AdminLoginResponse } from "src/types/LoginType";

import { ApiErrorResponse } from "@shared/types/error";

export const login = async (email: string, password: string) => {
  const response = await http.post<AdminLoginResponse>("/admin/login", {
    email,
    password,
  });
  return response as unknown as AdminLoginResponse;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: AdminLoginRequest) =>
      login(email, password),

    onSuccess: (data: AdminLoginResponse) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);

      router.push("/home");
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
