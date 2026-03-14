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
  OBJECTION_TITLE: '어떤 정책에 대한 이의제기인가요?',
  OBJECTION_DESCRIPTION: '변경을 원하는 정책을 선택해 주세요.',
  DATA_LIMIT_TITLE: '변경을 원하는 한도는 얼마인가요?',
  DATA_LIMIT_DESCRIPTION: 'description',
  CURRENT_LIMIT_LABEL: '현재 한도',
  TIME_LIMIT_TITLE: '변경을 원하는 시간은 언제인가요?',
  TIME_LIMIT_DESCRIPTION: 'description',
  CURRENT_TIME_LABEL: '현재 제한',
  FROM: '부터',
  TO: '까지',
  START_TIME_SETTING: '시작 시간 설정',
  END_TIME_SETTING: '종료 시간 설정',
  CONFIRM_TITLE: '이의 제기 내용을 확인해 주세요.',
  CONFIRM_DESCRIPTION: '입력하신 내용을 확인해 주세요.',
  POLICY_PREFIX: '정책: ',
  CHANGE_PREFIX: '변경: ',
  REASON_PREFIX: '요청 사유: ',
  EMERGENCY_DATA_AMOUNT: '300MB',
  REASON_INPUT_TITLE: '사유를 입력해 주세요.',
  REASON_INPUT_DESCRIPTION: 'description',
  REASON_INPUT_PLACEHOLDER: '입력하세요..',
  REASON_INPUT_ERROR: '사유를 입력해 주세요.',
  REJECT_REASON_DESCRIPTION: '거절하는 사유를 입력해 주세요.',
} as const;
