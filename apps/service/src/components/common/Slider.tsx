'use client';

import React from 'react';

import { cn } from '@shared';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const Slider = ({ min, max, value, onChange, disabled = false, className }: SliderProps) => {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn('grid h-fit w-full items-center px-1', className)}>
      <div className="col-start-1 row-start-1 h-2 w-full rounded-full bg-gray-100" />

      <div
        className={cn(
          'col-start-1 row-start-1 h-2 justify-self-start rounded-l-full transition-colors duration-300',
          disabled ? 'bg-gray-600' : 'bg-primary',
        )}
        style={{ width: `${percentage}%` }}
      />

      <div
        className="pointer-events-none col-start-1 row-start-1 flex w-full items-center"
        style={{ marginLeft: `${percentage}%` }}
      >
        <div
          className={cn(
            'bg-brand-white h-4 w-4 -translate-x-1/2 rounded-full border-2 shadow-sm transition-colors duration-300',
            disabled ? 'border-gray-600' : 'border-primary',
          )}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={handleSliderChange}
        disabled={disabled}
        className="z-10 col-start-1 row-start-1 h-full w-full cursor-pointer touch-none opacity-0 disabled:cursor-not-allowed"
        aria-label="slider"
      />
    </div>
  );
};

export default Slider;
