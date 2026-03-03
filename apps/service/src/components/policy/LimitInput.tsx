'use client';

import React from 'react';

interface LimitInputProps {
  value: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function LimitInput({ value, onChange, disabled = false }: LimitInputProps) {
  return (
    <div className="flex h-6 w-9 items-center justify-center rounded border border-gray-400 px-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="text-body1-m h-6 w-full text-center outline-none"
      />
    </div>
  );
}
