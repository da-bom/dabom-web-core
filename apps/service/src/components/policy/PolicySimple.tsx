'use client';

import React from 'react';

import { DoNotIcon, ErrorOutlineIcon, TimeIcon } from '@icons';
import { MainBox, cn } from '@shared';

import { Toggle } from '../common/Toggle';

interface PolicyItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  disabled?: boolean;
}

export const PolicyItem = ({ icon, label, value, disabled }: PolicyItemProps) => (
  <div className="flex h-6 w-full items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="text-primary flex h-4 w-4 items-center justify-center">
        <div className="text-primary flex h-4 w-4 items-center justify-center">{icon}</div>
      </div>
      <span className={cn('text-body1-m', disabled ? 'text-gray-500' : 'text-brand-black')}>
        {label}
      </span>
    </div>
    <div className="flex items-center">{value}</div>
  </div>
);

interface BlockProps {
  isBlocked: boolean;
  onToggle?: () => void;
  type?: 'toggle' | 'text';
}

export const PolicyBlock = ({ isBlocked, onToggle, type = 'toggle' }: BlockProps) => (
  <PolicyItem
    icon={<DoNotIcon sx={{ width: 16 }} />}
    label="데이터 사용 차단"
    value={
      type === 'text' ? (
        <span className="text-body1-m">{isBlocked ? 'ON' : 'OFF'}</span>
      ) : (
        <Toggle isChecked={isBlocked} onToggle={onToggle ?? (() => {})} disabled={!onToggle} />
      )
    }
  />
);

export const PolicyLimit = ({ text, disabled }: { text: string; disabled?: boolean }) => (
  <PolicyItem
    icon={<ErrorOutlineIcon sx={{ width: 16 }} />}
    label="데이터 사용 한도"
    disabled={disabled || text === '-'}
    value={
      <span
        className={cn(
          'text-body1-m',
          disabled || text === '-' ? 'text-gray-500' : 'text-brand-black',
        )}
      >
        {disabled ? '-' : text}
      </span>
    }
  />
);

export const PolicyTime = ({
  text,
  isOn,
  disabled,
}: {
  text: string;
  isOn?: boolean;
  disabled?: boolean;
}) => (
  <PolicyItem
    icon={<TimeIcon sx={{ width: 16 }} />}
    label="시간 제한"
    disabled={disabled || !isOn}
    value={
      <span
        className={cn('text-body1-m', disabled || !isOn ? 'text-gray-500' : 'text-brand-black')}
      >
        {disabled || !isOn ? '-' : text}
      </span>
    }
  />
);

interface PolicySimpleProps {
  children: React.ReactNode;
}

export default function PolicySimple({ children }: PolicySimpleProps) {
  return (
    <MainBox className="flex w-full flex-col items-start gap-5 rounded-2xl border-none p-0">
      {children}
    </MainBox>
  );
}

PolicySimple.Block = PolicyBlock;
PolicySimple.Limit = PolicyLimit;
PolicySimple.Time = PolicyTime;
