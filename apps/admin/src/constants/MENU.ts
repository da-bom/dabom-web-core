import { DocumentIcon, PeopleIcon } from '@icons';

export const MENU = [
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
] as const;
