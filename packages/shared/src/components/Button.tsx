import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: 'sm' | 'md' | 'md-short' | 'lg';
  color: 'dark' | 'light' | 'gray';
  isFullWidth?: boolean;
}

const SIZE_STYLES = {
  lg: 'w-82 h-14 rounded-2xl',
  md: 'w-55 h-14 rounded-2xl',
  'md-short': 'w-31 h-14 rounded-2xl',
  sm: 'w-14 h-9 rounded-md',
};

const COLOR_STYLES = {
  dark: 'bg-brand-dark text-brand-white',
  light: 'bg-background-sub text-brand-black',
  gray: 'bg-gray-100 text-gray-700 cursor-not-allowed',
};

const Button = ({ children, size, color, isFullWidth = false, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center border border-gray-200 transition-all',
        SIZE_STYLES[size],
        isFullWidth && 'w-full',
        COLOR_STYLES[color],
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
