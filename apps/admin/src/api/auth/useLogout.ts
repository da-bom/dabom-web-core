import { http } from "@shared";
import { useMutation } from "@tanstack/react-query";

import { ApiErrorResponse } from "@shared/types/error";

export const logout = () => http.post("/admin/logout");

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
