'use client';

import React from 'react';

import Image from 'next/image';

import { E911EmergencyIconFile } from '@icons';
import {
  Block as BlockIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';
import { Badge, BadgeColor } from '@shared';

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
  requesterName,
  onClick,
}: AppealRequestCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircleOutlineIcon sx={{ fontSize: 15 }} className="text-positive" />;
      case 'rejected':
        return <BlockIcon sx={{ fontSize: 15 }} className="text-negative" />;
      case 'emergency':
        return <Image src={E911EmergencyIconFile} alt="emergency" />;
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
      className="bg-brand-white flex h-21.25 w-full cursor-pointer flex-col justify-center gap-2 rounded-2xl border border-gray-200 p-4"
    >
      <div className="flex h-6 w-full items-center justify-between">
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

      {/* 요청 사유 영역 */}
      <p className="text-body2-m line-clamp-1 h-5.25 w-full text-gray-700">{reason}</p>
    </div>
  );
}
