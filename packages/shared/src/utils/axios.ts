import axios, { AxiosError } from "axios";

import { ApiErrorResponse, ERROR_CODES } from "../types/error";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Version": "1.0",
  },
});

http.interceptors.response.use(
  (response) => (response.data.success ? response.data.data : response),
  async (error: AxiosError<{ success: boolean; error: ApiErrorResponse }>) => {
    const response = error.response;
    let errorMessage = "네트워크 연결 상태를 확인해주세요.";

    if (response) {
      const { status, data } = response;
      const errorCode = data.error?.code;
      const serverMsg = data.error?.message;

      switch (errorCode) {
        case ERROR_CODES.AUTH_INVALID_CREDENTIALS:
          errorMessage = "잘못된 인증 정보입니다.";
          break;
        case ERROR_CODES.AUTH_TOKEN_EXPIRED:
          errorMessage = "인증 토큰이 만료되었습니다.";
          break;
        case ERROR_CODES.AUTH_TOKEN_INVALID:
          errorMessage = "유효하지 않은 토큰입니다.";
          break;
        case ERROR_CODES.AUTH_INSUFFICIENT_PERMISSION:
          errorMessage = "접근 권한이 부족합니다.";
          break;
        case ERROR_CODES.DATA_FAMILY_NOT_FOUND:
          errorMessage = "가족 그룹을 찾을 수 없습니다.";
          break;
        case ERROR_CODES.DATA_USER_NOT_FOUND:
          errorMessage = "사용자를 찾을 수 없습니다.";
          break;
        case ERROR_CODES.DATA_MEMBER_LIMIT_EXCEEDED:
          errorMessage = "최대 구성원 수 10명을 초과했습니다.";
          break;
        case ERROR_CODES.POLICY_USER_BLOCKED:
          errorMessage = "차단된 사용자입니다.";
          break;
        case ERROR_CODES.POLICY_QUOTA_EXCEEDED:
          errorMessage = "할당량을 초과했습니다.";
          break;
        case ERROR_CODES.POLICY_TIME_BLOCKED:
          errorMessage = "현재 시간대에는 이용이 차단되었습니다.";
          break;
        case ERROR_CODES.POLICY_ALREADY_BLOCKED:
          errorMessage = "이미 차단된 상태입니다.";
          break;
        case ERROR_CODES.SYS_INTERNAL_ERROR:
          errorMessage = "내부 서버 오류가 발생했습니다.";
          break;
        case ERROR_CODES.SYS_REDIS_UNAVAILABLE:
          errorMessage = "서버 저장소 연결이 원활하지 않습니다.";
          break;
        case ERROR_CODES.SYS_RATE_LIMIT_EXCEEDED:
          errorMessage = "요청 횟수를 초과했습니다.";
          break;
        case ERROR_CODES.SYS_SERVICE_UNAVAILABLE:
          errorMessage = "현재 서비스를 이용할 수 없습니다.";
          break;
        default:
          errorMessage =
            serverMsg ||
            (status === 429
              ? "너무 많은 요청이 발생했습니다."
              : "알 수 없는 오류가 발생했습니다.");
      }

      return Promise.reject({
        ...data.error,
        errorMessage: errorMessage,
      });
    }

    return Promise.reject({
      code: "NETWORK_ERROR",
      errorMessage,
    });
  },
);

export default http;
