import { ReactNode } from 'react';

type BadgeColor = 'primary' | 'white' | 'gray' | 'outline' | 'primary_light' | 'negative';
type BadgeSize = 'sm' | 'lg';

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
  };

  const sizes: Record<BadgeSize, string> = {
    sm: 'px-3 text-caption-d rounded-full',
    lg: 'px-4  text-body2-d rounded-full',
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
