'use client';

import React from 'react';

import { cn } from '@shared';

interface LimitInputProps {
  value: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function LimitInput({ value, onChange, disabled = false }: LimitInputProps) {
  return (
    <div
      className={cn(
        'flex h-7 w-13.75 items-center justify-center rounded border border-gray-400 px-2 transition-colors',
        disabled ? 'bg-gray-100' : 'bg-brand-white',
      )}
    >
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'text-body1-m h-6 w-full text-center transition-colors outline-none',
          disabled ? 'bg-gray-100 text-gray-700' : 'bg-brand-white text-gray-800',
        )}
      />
    </div>
  );
}
