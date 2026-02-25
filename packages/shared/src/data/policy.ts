import { PolicyType } from "../types/policyType";

export const POLICY = {
  policies: [
    {
      id: 1,
      name: "데이터 사용량 한도 설정",
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
    {
      id: 2,
      name: "데이터 사용 시간 제한",
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
    {
      id: 3,
      name: "데이터 사용 차단",
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
    {
      id: 4,
      name: "어플 차단",
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
  ] as unknown as PolicyType[],
  page: 0,
  size: 20,
  totalElements: 15,
  totalPages: 1,
} as const;
