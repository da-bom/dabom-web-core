'use client';

import { CheckOutlinedIcon, DoNotIcon, E911EmergencyIcon } from '@icons';
import { Badge } from '@shared';

import { BadgeColor } from '@shared/type/badge';

import { APPEAL_TYPE_LABEL } from 'src/constants/appeal';

export type AppealStatus = 'pending' | 'approved' | 'rejected' | 'emergency';

interface AppealRequestCardProps {
  policyType: string;
  dataLimit: string;
  reason: string;
  status: AppealStatus;
  requesterName?: string;
  onClick?: () => void;
}

export function AppealRequestCard({
  policyType,
  dataLimit,
  reason,
  status,
  onClick,
}: AppealRequestCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckOutlinedIcon sx={{ fontSize: 15 }} className="text-positive" />;
      case 'rejected':
        return <DoNotIcon sx={{ fontSize: 15 }} className="text-negative" />;
      case 'emergency':
        return <E911EmergencyIcon className="text-negative" />;
      case 'pending':
      default:
        return null;
    }
  };

  const getBadgeColor = (): BadgeColor => {
    switch (status) {
      case 'pending':
        return 'primary_light';
      case 'emergency':
        return 'emergency';
      case 'approved':
      case 'rejected':
        return 'gray_light';
      default:
        return 'gray_light';
    }
  };

  const isEmergency = status === 'emergency' || policyType === APPEAL_TYPE_LABEL.EMERGENCY;

  return (
    <div
      onClick={onClick}
      className="bg-brand-white flex w-full cursor-pointer flex-col justify-center gap-2 rounded-2xl border border-gray-200 p-4"
    >
      <div className="flex h-fit w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge color={getBadgeColor()} className="px-4">
            <span className="text-body2-d">{policyType}</span>
          </Badge>

          <div className="flex items-center gap-2">
            {!isEmergency && <span className="text-body1-m">{dataLimit}</span>}
            <div className="flex h-4 w-4 items-center justify-center">{getStatusIcon()}</div>
          </div>
        </div>
      </div>

      <p className="text-body2-m line-clamp-1 w-full text-gray-700">{reason}</p>
    </div>
  );
}
