import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/auth';
import { ApiError, ApiErrorResponse, ERROR_CODES, ERROR_MESSAGE_MAP } from '../types/error';

interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Version': '1.0',
  },
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

http.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
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
    const { config, response } = error;
    const originalRequest = config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (response && originalRequest) {
      const { status, data } = response;
      const errorCode = data.error?.code;

      const isTokenExpired =
        errorCode === ERROR_CODES.AUTH_TOKEN_EXPIRED ||
        errorCode === ERROR_CODES.AUTH_TOKEN_INVALID ||
        status === 401;

      if (isTokenExpired && !originalRequest._retry && typeof window !== 'undefined') {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return http(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const refreshUrl = process.env.NEXT_PUBLIC_REFRESH_URL;

        if (!refreshUrl) {
          console.error('❌ NEXT_PUBLIC_REFRESH_URL이 .env에 설정되지 않았습니다.');
          return Promise.reject(error);
        }

        try {
          const { data: refreshRes } = await axios.post<RefreshResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${refreshUrl}`,
            { refreshToken },
          );

          const { accessToken: newAT, refreshToken: newRT } = refreshRes.data;

          localStorage.setItem(ACCESS_TOKEN_KEY, newAT);
          localStorage.setItem(REFRESH_TOKEN_KEY, newRT);
          setCookie(ACCESS_TOKEN_KEY, newAT, { path: '/' });

          processQueue(null, newAT);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAT}`;
          }
          return http(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          deleteCookie(ACCESS_TOKEN_KEY);
          deleteCookie(REFRESH_TOKEN_KEY);

          if (window.location.pathname !== '/login' && window.location.pathname !== '/expired') {
            window.location.href = '/expired';
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      const serverMsg = data.error?.message;
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
