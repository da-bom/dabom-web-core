import { formatToBytes } from '@shared';

export const DATA = [
  {
    id: 1,
    label: '100MB',
    value: formatToBytes(100, 'MB'),
  },
  {
    id: 2,
    label: '300MB',
    value: formatToBytes(300, 'MB'),
  },
  {
    id: 3,
    label: '500MB',
    value: formatToBytes(500, 'MB'),
  },
  {
    id: 4,
    label: '1GB',
    value: formatToBytes(1, 'GB'),
  },
];
