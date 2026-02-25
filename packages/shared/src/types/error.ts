export const ERROR_CODES = {
  // 인증 에러
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_INSUFFICIENT_PERMISSION: 'AUTH_INSUFFICIENT_PERMISSION',

  // 데이터 에러
  DATA_FAMILY_NOT_FOUND: 'DATA_FAMILY_NOT_FOUND',
  DATA_USER_NOT_FOUND: 'DATA_USER_NOT_FOUND',
  DATA_MEMBER_LIMIT_EXCEEDED: 'DATA_MEMBER_LIMIT_EXCEEDED',

  // 정책 에러
  POLICY_USER_BLOCKED: 'POLICY_USER_BLOCKED',
  POLICY_QUOTA_EXCEEDED: 'POLICY_QUOTA_EXCEEDED',
  POLICY_TIME_BLOCKED: 'POLICY_TIME_BLOCKED',
  POLICY_ALREADY_BLOCKED: 'POLICY_ALREADY_BLOCKED',

  // 시스템 에러
  SYS_INTERNAL_ERROR: 'SYS_INTERNAL_ERROR',
  SYS_REDIS_UNAVAILABLE: 'SYS_REDIS_UNAVAILABLE',
  SYS_RATE_LIMIT_EXCEEDED: 'SYS_RATE_LIMIT_EXCEEDED',
  SYS_SERVICE_UNAVAILABLE: 'SYS_SERVICE_UNAVAILABLE',

  // 그 외 에러
  LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export const ERROR_MESSAGE_MAP: Record<ErrorCode, string> = {
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: '잘못된 인증 정보입니다.',
  [ERROR_CODES.AUTH_TOKEN_EXPIRED]: '인증 토큰이 만료되었습니다.',
  [ERROR_CODES.AUTH_TOKEN_INVALID]: '유효하지 않은 토큰입니다.',
  [ERROR_CODES.AUTH_INSUFFICIENT_PERMISSION]: '접근 권한이 부족합니다.',

  [ERROR_CODES.DATA_FAMILY_NOT_FOUND]: '가족 그룹을 찾을 수 없습니다.',
  [ERROR_CODES.DATA_USER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
  [ERROR_CODES.DATA_MEMBER_LIMIT_EXCEEDED]: '최대 구성원 수 10명을 초과했습니다.',

  [ERROR_CODES.POLICY_USER_BLOCKED]: '차단된 사용자입니다.',
  [ERROR_CODES.POLICY_QUOTA_EXCEEDED]: '할당량을 초과했습니다.',
  [ERROR_CODES.POLICY_TIME_BLOCKED]: '현재 시간대에는 이용이 차단되었습니다.',
  [ERROR_CODES.POLICY_ALREADY_BLOCKED]: '이미 차단된 상태입니다.',

  [ERROR_CODES.SYS_INTERNAL_ERROR]: '내부 서버 오류가 발생했습니다.',
  [ERROR_CODES.SYS_REDIS_UNAVAILABLE]: '서버 저장소 연결이 원활하지 않습니다.',
  [ERROR_CODES.SYS_RATE_LIMIT_EXCEEDED]: '요청 횟수를 초과했습니다.',
  [ERROR_CODES.SYS_SERVICE_UNAVAILABLE]: '현재 서비스를 이용할 수 없습니다.',

  [ERROR_CODES.NETWORK_ERROR]: '네트워크 연결 상태를 확인해주세요.',
  [ERROR_CODES.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
  [ERROR_CODES.LIMIT_EXCEEDED]: '너무 많은 요청이 발생했습니다.',
};

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ApiErrorResponse {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
  errorMessage: string;
}

export class ApiError extends Error {
  code: ErrorCode;
  status?: number;
  errorMessage: string;
  details?: Record<string, unknown>;

  constructor(data: ApiErrorResponse & { status?: number }) {
    super(data.errorMessage);

    this.name = 'ApiError';
    this.code = data.code;
    this.status = data.status;
    this.errorMessage = data.errorMessage;
    this.details = data.details;

    Object.setPrototypeOf(this, ApiError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
