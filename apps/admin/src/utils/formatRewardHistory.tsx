'use client';

import { CopyIcon } from '@icons';
import { cn, formatPhoneNumber } from '@shared';
import dayjs from 'dayjs';

import { RewardGrant } from 'src/api/reward/schema';

const STATUS_MAP = {
  ISSUED: { label: '미사용', className: 'text-negative' },
  USED: { label: '사용', className: '' },
  EXPIRED: { label: '만료', className: 'text-gray-400' },
} as const;

export const formatRewardHistory = ({ history }: { history: readonly RewardGrant[] }) => {
  return history.map((item) => {
    const statusInfo = STATUS_MAP[item.status];

    return {
      id: item.grantId,
      cells: [
        <span key={`phone-${item.grantId}`} className="text-gray-900">
          {formatPhoneNumber(item.customer.phoneNumber)}
        </span>,

        <span key={`status-${item.grantId}`} className={cn(statusInfo.className)}>
          {statusInfo.label}
        </span>,

        <span key={`product-${item.grantId}`}>{item.reward.name}</span>,

        <span key={`mission-${item.grantId}`}>{item.mission.missionText}</span>,

        <span key={`coupon-${item.grantId}`} className="inline-flex items-center gap-1">
          {item.couponCode ? (
            <>
              <span>{`${item.couponCode.slice(0, -6)}******`}</span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(item.couponCode!)}
                className="ml-1 flex items-center"
                aria-label="쿠폰 번호 복사"
              >
                <CopyIcon className="text-gray-400 hover:text-gray-800" sx={{ width: 16 }} />
              </button>
            </>
          ) : (
            <span>-</span>
          )}
        </span>,

        <span key={`issued-${item.grantId}`}>{dayjs(item.createdAt).format('YYYY.MM.DD')}</span>,

        <span key={`expired-${item.grantId}`}>
          {item.expiredAt ? dayjs(item.expiredAt).format('YYYY.MM.DD') : '-'}
        </span>,
      ],
    };
  });
};
