import React from 'react';

import { DoNotIcon, cn } from '@shared';

interface PolicyBlockOwnerProps {
  isBlocked: boolean;
  isEditingByOther: boolean;
  onToggleBlock: () => void;
}

export function PolicyBlockOwner({
  isBlocked,
  isEditingByOther,
  onToggleBlock,
}: PolicyBlockOwnerProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <DoNotIcon sx={{ fontSize: 16 }} className="text-primary" />
        <span className="text-body1-m">데이터 사용 차단</span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!isEditingByOther) onToggleBlock();
        }}
        role="switch"
        disabled={isEditingByOther}
        aria-checked={isBlocked}
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
    </div>
  );
}
