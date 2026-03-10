import { ReactNode } from 'react';

import { BadgeColor, BadgeSize } from '../types/badge';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  color?: BadgeColor;
  size?: BadgeSize;
}

const Badge = ({ children, className, color = 'primary', size = 'sm' }: BadgeProps) => {
  const colors: Record<BadgeColor, string> = {
    primary: 'bg-primary text-brand-white',
    white: 'bg-brand-white ',
    gray: 'bg-gray-200',
    outline: 'bg-brand-white text-brand-dark border-2 border-primary text-primary',
    primary_light: 'bg-primary-100',
    negative: 'text-negative border border-negative',
    gray_light: 'bg-gray-100',
    emergency: 'bg-primary-emergency',
    approved: 'bg-brand-white border border-positive text-positive',
    rejected: 'bg-brand-white border border-negative text-negative',
  };

  const sizes: Record<BadgeSize, string> = {
    sm: 'px-3 text-caption-d rounded-full',
    lg: 'px-4  text-body2-d rounded-full',
    md_fixed: 'w-[150px] h-8 rounded-full text-body1-m',
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap ${sizes[size]} ${colors[color]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
};

export default Badge;
