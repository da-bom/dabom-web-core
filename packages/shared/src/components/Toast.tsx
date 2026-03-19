'use client';

import React from 'react';

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
      className={`'bg-brand-white md:px-20' flex h-8 w-fit items-center justify-center rounded-full border px-10 transition-all duration-300 ease-in-out md:h-10 ${STYLE_CONFIG[style].container} ${visible ? 'animate-enter opacity-100' : 'animate-leave opacity-0'} `}
    >
      <span
        className={`text-body2-m md:text-body1-d px-4 text-center whitespace-nowrap select-none ${STYLE_CONFIG[style].text} `}
      >
        {message}
      </span>
    </div>
  );
}
