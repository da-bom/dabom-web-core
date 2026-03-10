'use client';

import React from 'react';

import { cn } from '@shared';

const FilterButton = ({
  children,
  isSelected,
  onClick,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-full flex-1 cursor-pointer items-center justify-center rounded-lg transition-colors',
        isSelected ? 'bg-background-sub text-primary' : 'bg-transparent text-gray-600',
      )}
      onClick={onClick}
    >
      <span className="text-body2-m">{children}</span>
    </button>
  );
};

interface FilterSegmentProps {
  activeTab: 'progress' | 'completed';
  onTabChange: (tab: 'progress' | 'completed') => void;
}

export function FilterSegment({ activeTab, onTabChange }: FilterSegmentProps) {
  return (
    <div className="bg-brand-white flex h-fit w-full flex-col items-start gap-1 rounded-2xl border border-gray-200 p-2">
      <div className="flex h-10 w-full items-center">
        <FilterButton isSelected={activeTab === 'progress'} onClick={() => onTabChange('progress')}>
          진행 중
        </FilterButton>
        <FilterButton
          isSelected={activeTab === 'completed'}
          onClick={() => onTabChange('completed')}
        >
          완료
        </FilterButton>
      </div>
    </div>
  );
}
