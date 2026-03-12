import { ChartIcon, DashboardIcon, DocumentIcon, GiftIcon, PeopleIcon } from '@icons';

export const MENU = [
  {
    id: 'DASHBOARD',
    label: '대시보드',
    description: '실시간 서비스 현황을 확인합니다.',
    path: '/dashboard',
    icon: DashboardIcon,
  },
  {
    id: 'POLICY',
    label: '정책 관리',
    description: '전체 유저에게 적용되는 정책을 관리합니다.',
    path: '/policy',
    icon: DocumentIcon,
  },
  {
    id: 'FAMILY',
    label: '가족 관리',
    description: '가족의 권한과 정책을 관리합니다.',
    path: '/family',
    icon: PeopleIcon,
  },
  {
    id: 'REWARD',
    label: '보상 관리',
    path: '/reward',
    icon: GiftIcon,
    subItems: [
      {
        label: '상품 설정',
        path: '/reward/products',
        description: '유저에게 제공될 보상의 종류를 관리합니다.',
      },
      {
        label: '지급 내역',
        path: '/reward/history',
        description: '유저에게 제공된 보상을 관리합니다.',
      },
    ],
  },
  {
    id: 'AUDIT_LOG',
    label: '감사 로그',
    description: '',
    path: '/audit-log',
    icon: ChartIcon,
  },
] as const;
