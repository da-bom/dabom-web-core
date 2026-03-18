'use client';

import React from 'react';

import { Button, cn } from '@shared';

interface AppealInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function AppealInputBar({ value, onChange, onSubmit, disabled }: AppealInputBarProps) {
  return (
    <div
      className={cn(
        'bg-brand-white flex h-14 w-full items-center gap-4 border-t border-gray-200 p-2',
        disabled && 'bg-white',
      )}
    >
      <div className="flex w-full items-center gap-2">
        <div
          className={cn(
            'flex h-9 flex-1 items-center rounded-lg border px-3',
            disabled ? 'border-gray-100 bg-gray-100' : 'border-gray-100 bg-transparent',
          )}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="text-body2-m w-full bg-transparent outline-none disabled:text-gray-400"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            color={disabled ? 'gray' : 'dark'}
            onClick={onSubmit}
            disabled={disabled}
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  );
}
