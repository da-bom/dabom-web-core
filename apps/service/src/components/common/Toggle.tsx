import React from 'react';

import { cn } from '@shared';

interface ToggleProps {
  isChecked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function Toggle({ isChecked, onToggle, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onToggle();
      }}
      role="switch"
      disabled={disabled}
      aria-checked={isChecked}
      className={cn(
        'flex h-4 w-7 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out',
        isChecked ? (disabled ? 'bg-gray-700' : 'bg-primary-500') : 'bg-gray-500',
        disabled && 'cursor-not-allowed',
      )}
    >
      <div
        className={cn(
          'bg-brand-white shadow-default h-3.5 w-3.5 rounded-full transition-transform duration-200 ease-in-out',
          isChecked ? 'translate-x-3' : 'translate-x-0',
        )}
      />
    </button>
  );
}
