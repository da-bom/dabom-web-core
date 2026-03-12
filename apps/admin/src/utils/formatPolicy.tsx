'use client';

import Link from 'next/link';

import { Button, formatSize } from '@shared';

import {
  AppBlock,
  DefaultRules,
  MonthlyLimit,
  Policy,
  PolicyType,
  TimeBlock,
} from 'src/api/policy/schema';

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
      const apps = (rules as AppBlock).blockedApps;
      return apps?.length > 0 ? `${apps[0]} 외 ${apps.length - 1}개` : '차단 앱 없음';

    default:
      return '-';
  }
};
export const formatPolicy = ({ policies }: { policies: Policy[] }) => {
  return policies.map((p) => {
    const isDeactive = !p.isActive;
    const activeClass = isDeactive ? 'text-gray-400' : '';

    return {
      id: p.policyId,
      cells: [
        <span key="name" className={activeClass}>
          {p.name}
        </span>,

        <span key="role" className={activeClass}>
          {p.requireRole}
        </span>,

        <span key="rule" className={activeClass}>
          {formatDefaultRule(p.type, p.defaultRules)}
        </span>,

        <span key="status" className={p.isActive ? 'text-primary' : 'text-gray-400'}>
          {p.isActive ? '활성화' : '비활성화'}
        </span>,

        p.isActive ? (
          <Link key="edit" href={`/policy/${p.policyId}`}>
            <Button color="light" size="sm">
              수정
            </Button>
          </Link>
        ) : (
          <Button key="edit" color="gray" size="sm">
            수정
          </Button>
        ),
      ],
    };
  });
};
