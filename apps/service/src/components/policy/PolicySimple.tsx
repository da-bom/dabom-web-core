'use client';

import React from 'react';

import { DoNotIcon, ErrorOutlineIcon, MainBox, TimeIcon, cn } from '@shared';

interface PolicyItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const PolicyItem = ({ icon, label, value }: PolicyItemProps) => (
  <div className="flex h-6 w-full items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="text-primary flex h-4 w-4 items-center justify-center">{icon}</div>
      <span className="text-body1-m text-brand-black">{label}</span>
    </div>
    <div className="flex items-center">{value}</div>
  </div>
);

interface BlockProps {
  isBlocked: boolean;
  onToggle?: () => void;
}

const Block = ({ isBlocked, onToggle }: BlockProps) => (
  <PolicyItem
    icon={<DoNotIcon />}
    label="데이터 사용 차단"
    value={
      <button
        type="button"
        role="switch"
        aria-checked={isBlocked}
        onClick={onToggle}
        disabled={!onToggle}
        className={cn(
          'flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out',
          isBlocked ? 'bg-primary-500' : 'bg-gray-500',
        )}
      >
        <div
          className={cn(
            'bg-brand-white h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out',
            isBlocked ? 'translate-x-3' : 'translate-x-0',
          )}
        />
      </button>
    }
  />
);

const Limit = ({ text }: { text: string }) => (
  <PolicyItem
    icon={<ErrorOutlineIcon />}
    label="데이터 사용 한도"
    value={<span className="text-body1-m text-brand-black">{text}</span>}
  />
);

const Time = ({ text }: { text: string }) => (
  <PolicyItem
    icon={<TimeIcon />}
    label="시간 제한"
    value={<span className="text-body1-m text-brand-black">{text}</span>}
  />
);

interface PolicySimpleProps {
  children: React.ReactNode;
}

export default function PolicySimple({ children }: PolicySimpleProps) {
  return (
    <MainBox className="flex h-36 w-[350px] flex-col items-start gap-5 rounded-2xl p-4">
      {children}
    </MainBox>
  );
}

PolicySimple.Block = Block;
PolicySimple.Limit = Limit;
PolicySimple.Time = Time;
