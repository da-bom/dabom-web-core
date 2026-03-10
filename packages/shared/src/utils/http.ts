import axios, { AxiosError } from 'axios';

import { ApiError, ApiErrorResponse, ERROR_CODES, ERROR_MESSAGE_MAP } from '../types/error';

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Version': '1.0',
  },
});

http.interceptors.request.use((config) => {
  if (globalThis.window !== undefined) {
    const token = globalThis.localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    if (response.data?.success) {
      return response.data.data;
    }
    return response;
  },
  async (error: AxiosError<{ success: boolean; error: ApiErrorResponse }>) => {
    const response = error.response;

    if (response) {
      const { status, data } = response;
      const errorCode = data.error?.code;
      const serverMsg = data.error?.message;

      if (
        (errorCode === ERROR_CODES.AUTH_TOKEN_EXPIRED ||
          errorCode === ERROR_CODES.AUTH_TOKEN_INVALID) &&
        globalThis.window !== undefined
      ) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/expired' && currentPath !== '/login') {
          localStorage.removeItem('access_token');
          window.location.href = '/expired';
        }
      }

      const errorMessage =
        ERROR_MESSAGE_MAP[errorCode as keyof typeof ERROR_MESSAGE_MAP] ||
        serverMsg ||
        (status === 429
          ? ERROR_MESSAGE_MAP[ERROR_CODES.SYS_RATE_LIMIT_EXCEEDED]
          : ERROR_MESSAGE_MAP[ERROR_CODES.UNKNOWN_ERROR]);

      throw new ApiError({
        ...data.error,
        status,
        errorMessage,
      });
    }

    throw new ApiError({
      code: ERROR_CODES.NETWORK_ERROR,
      message: 'Network connection failed',
      errorMessage: ERROR_MESSAGE_MAP[ERROR_CODES.NETWORK_ERROR],
    });
  },
);
