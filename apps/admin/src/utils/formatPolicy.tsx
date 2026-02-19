import Link from "next/link";

import { Button, cn, formatSize } from "@shared";

import { PolicyType } from "@shared/types/policyType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatDefaultRule = (rules: any, type: PolicyType["type"]): string => {
  switch (type) {
    case "MonthlyBlock":
      return formatSize(rules.monthlyLimitBytes).total;

    case "TimeBlock":
      return `${rules.start} ~ ${rules.end}`;

    case "ManualBlock":
      return "-";

    case "AppBlock":
      return rules.apps.length > 0
        ? `${rules.apps[0]} 외 ${rules.apps.length - 1}개`
        : "차단 앱 없음";

    default:
      return "-";
  }
};

export const formatPolicy = ({ policies }: { policies: PolicyType[] }) => {
  return policies.map((p) => {
    const isDeactive = !p.isActive;

    const cell = (children: React.ReactNode) => (
      <div className={cn(isDeactive && "text-gray-400 opacity-60")}>
        {children}
      </div>
    );

    return {
      id: p.policyId,
      cells: [
        cell(p.name),
        cell(p.requireRole),
        cell(formatDefaultRule(p.default_rules, p.type)),
        cell(
          p.isActive ? (
            <span className="text-primary">활성화</span>
          ) : (
            "비활성화"
          ),
        ),
        cell(
          p.isActive ? (
            <Link href={`/policy/${p.policyId}`}>
              <Button color="light" size="sm">
                수정
              </Button>
            </Link>
          ) : (
            <Button color="gray" size="sm">
              수정
            </Button>
          ),
        ),
      ],
    };
  });
};
