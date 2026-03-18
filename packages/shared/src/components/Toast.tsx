'use client';

import React from 'react';

import { cn } from '../utils/cn';

export type ToastStyle = 'positive' | 'default' | 'negative';

interface ToastProps {
  message: string;
  style?: ToastStyle;
  visible?: boolean;
}

const STYLE_CONFIG = {
  positive: {
    container: 'border-positive text-positive',
    text: 'text-positive',
  },
  default: {
    container: 'border-primary-700 text-primary-700',
    text: 'text-primary-700',
  },
  negative: {
    container: 'border-negative text-negative',
    text: 'text-negative',
  },
};

export default function Toast({ message, style = 'default', visible }: ToastProps) {
  return (
    <div
      className={cn(
        'bg-brand-white flex items-center justify-center rounded-full border transition-all duration-300 ease-in-out',
        'h-8 w-fit px-10 md:h-10 md:px-20',
        STYLE_CONFIG[style].container,
        visible ? 'animate-enter opacity-100' : 'animate-leave opacity-0',
      )}
    >
      <span
        className={cn(
          'px-4 text-center whitespace-nowrap select-none',
          'text-body2-m md:text-body1-d',
          STYLE_CONFIG[style].text,
        )}
      >
        {message}
      </span>
    </div>
  );
}
