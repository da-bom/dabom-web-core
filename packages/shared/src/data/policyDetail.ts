const POLICY_DETAIL = {
  1: {
    policyId: 1,
    name: "데이터 사용량 한도 설정",
    description: "owner는 member의 데이터 사용량 한도를 설정할 수 있다.",
    type: "MONTHLY_LIMIT",
    default_rules: {
      monthlyLimitBytes: 5368709120,
    },
    requireRole: "OWNER",
    isActive: true,
    isSystem: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  2: {
    policyId: 2,
    name: "데이터 사용 시간 제한",
    description: "owner는 member의 데이터 사용 시간을 제한할 수 있다.",
    type: "TIME_BLOCK",
    default_rules: {
      start: "22:00",
      end: "07:00",
      timezone: "Asia/Seoul",
    },
    requireRole: "OWNER",
    isActive: true,
    isSystem: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  3: {
    policyId: 3,
    name: "데이터 사용 차단",
    description: "owner는 member의 데이터 사용을 차단할 수 있다.",
    type: "MANUAL_BLOCK",
    default_rules: {
      reason: "MANUAL",
    },
    requireRole: "OWNER",
    isActive: true,
    isSystem: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  4: {
    policyId: 4,
    name: "어플 차단",
    description: "어떻게 할까용?",
    type: "APP_BLOCK",
    default_rules: {
      apps: ["youtube", "instagram"],
    },
    requireRole: "ADMIN",
    isActive: false,
    isSystem: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
} as const;

export default POLICY_DETAIL;
