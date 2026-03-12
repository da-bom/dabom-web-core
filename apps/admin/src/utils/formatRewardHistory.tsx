'use client';

import { CopyIcon } from '@icons';
import { cn, formatPhoneNumber } from '@shared';
import dayjs from 'dayjs';

export interface RewardHistoryItem {
  id: number;
  phoneNumber: string;
  status: '사용' | '미사용' | '만료';
  productName: string;
  mission: string;
  couponNumber: string;
  issuedAt: string;
  expiredAt: string;
}

export const formatRewardHistory = ({ history }: { history: readonly RewardHistoryItem[] }) => {
  return history.map((item) => ({
    id: item.id,
    cells: [
      <span key={`phone-${item.id}`} className="text-gray-900">
        {formatPhoneNumber(item.phoneNumber)}
      </span>,

      <span
        key={`status-${item.id}`}
        className={cn(
          item.status === '미사용' && 'text-negative',
          item.status === '만료' && 'text-gray-400',
        )}
      >
        {item.status}
      </span>,
      <span key={`product-${item.id}`}>{item.productName}</span>,

      <span key={`mission-${item.id}`}>{item.mission}</span>,

      <span key={`coupon-${item.id}`} className="inline-flex items-center gap-1">
        <span>
          {item.couponNumber.length > 4 ? `${item.couponNumber.slice(0, -4)}****` : '****'}
        </span>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(item.couponNumber)}
          className="flex items-center"
        >
          <CopyIcon className="text-gray-400 hover:text-gray-800" sx={{ width: 16 }} />
        </button>
      </span>,

      <span key={`issued-${item.id}`}>{dayjs(item.issuedAt).format('YYYY.MM.DD')}</span>,

      <span key={`expired-${item.id}`}>{dayjs(item.expiredAt).format('YYYY.MM.DD')}</span>,
    ],
  }));
};
