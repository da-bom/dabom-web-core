export const APPEAL_TYPE_LABEL = {
  EMERGENCY: '긴급 요청',
  NORMAL: '데이터 한도',
  TIME_BLOCK: '시간 제한',
} as const;

export const APPEAL_STATUS_LABEL = {
  PENDING: '대기 중',
  APPROVED: '수락됨',
  REJECTED: '거절됨',
  CANCELLED: '취소됨',
} as const;

export const APPEAL_UI_TEXT = {
  REQUEST_REASON: '요청 사유',
  REJECT_REASON: '거절 사유',
} as const;
