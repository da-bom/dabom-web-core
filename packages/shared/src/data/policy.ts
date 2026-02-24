import { PolicyType } from "../types/policyType";

export const POLICY = {
  policies: [
    {
      policyId: 10,
      name: "데이터 사용량 한도 설정",
      type: "MonthlyBlock",
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
      policyId: 11,
      name: "데이터 사용 시간 제한",
      type: "TimeBlock",
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
      policyId: 12,
      name: "데이터 사용 차단",
      type: "ManualBlock",
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
      policyId: 13,
      name: "어플 차단",
      description: "어떻게 할까용?",
      type: "AppBlock",
      default_rules: {
        apps: ["youtube", "instagram"],
      },
      requireRole: "ADMIN",
      isActive: false,
      isSystem: false,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ] as PolicyType[],
  page: 0,
  size: 20,
  totalElements: 15,
  totalPages: 1,
} as const;
