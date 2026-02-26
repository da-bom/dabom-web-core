import Link from 'next/link';

import { Button, cn, formatSize } from '@shared';
import {
  AppBlock,
  DefaultRules,
  MonthlyLimit,
  Policy,
  PolicyType,
  TimeBlock,
} from 'src/services/policy/schema';

const formatDefaultRule = (type: PolicyType, rules: DefaultRules): string => {
  switch (type) {
    case 'MONTHLY_LIMIT':
      return formatSize((rules as MonthlyLimit).limitBytes).total;

    case 'TIME_BLOCK':
      const t = rules as TimeBlock;
      return `${t.start} ~ ${t.end}`;

    case 'MANUAL_BLOCK':
      return '-';

    case 'APP_BLOCK':
      const apps = (rules as AppBlock).apps;
      return apps?.length > 0 ? `${apps[0]} 외 ${apps.length - 1}개` : '차단 앱 없음';

    default:
      return '-';
  }
};

export const formatPolicy = ({ policies }: { policies: Policy[] }) => {
  return policies.map((p) => {
    const isDeactive = !p.isActive;

    const cell = (children: React.ReactNode) => (
      <div className={cn(isDeactive && 'text-gray-400 opacity-60')}>{children}</div>
    );

    return {
      id: p.id,
      cells: [
        cell(p.name),
        cell(p.requiredRole),
        cell(formatDefaultRule(p.policyType, p.defaultRules)),
        cell(p.isActive ? <span className="text-primary">활성화</span> : '비활성화'),
        cell(
          p.isActive ? (
            <Link href={`/policy/${p.id}`}>
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
