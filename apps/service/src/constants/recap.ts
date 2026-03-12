export const RECAP_UI_TEXT = {
  STEP1_TITLE_SUFFIX: '요일에 데이터를 많이 사용하시네요!',
  STEP2_NIGHT_SUFFIX: '시에 데이터를\n가장 많이 이용하시네요🦉',
  STEP2_MORNING_SUFFIX: '시에 데이터를\n가장 많이 이용하시네요🥞',
  STEP3_TITLE_PREFIX: '님의 이의 제기가\n',
  STEP3_TITLE_SUFFIX: ' 통했어요',
  STEP4_TITLE_SUFFIX: '님이\n가장 너그러운 데이터 천사로\n등극하셨네요!',
  STEP5_TITLE_PREFIX: '이번 달 우리 가족은\n',
  STEP5_TITLE_SUFFIX: '개의 미션을 진행했어요',
  SUCCESS: '성공',
  FAILURE: '실패',
  COUNT_UNIT: '건',
  SHARE: '리포트 공유하기',
  STEP6_HIGH_SCORE: '와우!\n우리 가족은 서로를\n아주 잘 이해하고 있네요! 🏆',
  STEP6_LOW_SCORE: '다음 달엔\n조금 더 솔직한\n조르기 메시지를 보내볼까요? 😊',
  WEEKDAY_LABELS: {
    monday: '월',
    tuesday: '화',
    wednesday: '수',
    thursday: '목',
    friday: '금',
    saturday: '토',
    sunday: '일',
  },
} as const;

export const RECAP_CONFIG = {
  TOTAL_STEPS: 6,
  DEFAULT_YEAR: '2026',
  DEFAULT_MONTH: '3',
  MAX_RECENT_APPEALS: 3,
  MORNING_START_HOUR: 6,
  MORNING_END_HOUR: 18,
} as const;
