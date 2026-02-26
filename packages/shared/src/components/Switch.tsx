import { RefreshIcon } from '../assets/icons';
import { cn } from '../utils/cn';

interface SwitchProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary' | 'gray';
  size: 'sm' | 'lg';
  onClick: () => void;
}

const Switch = ({ children, type, size, onClick }: Readonly<SwitchProps>) => {
  return (
    <button
      type="button"
      className={cn(
        'flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-4 py-1',
        type === 'primary' && 'border-primary bg-primary-50',
        type === 'secondary' && 'border-primary-800',
        type === 'gray' && 'border-gray-800 bg-gray-100',

        size === 'sm' ? 'text-caption-d' : 'text-body2-d',
      )}
      onClick={onClick}
    >
      <div className="text-brand-dark">{children}</div>
      <RefreshIcon
        className={type === 'gray' ? 'text-gray-800' : 'text-primary'}
        {...(size === 'sm' && { width: 11, height: 11 })}
        {...(size === 'lg' && { width: 13, height: 13 })}
      />
    </button>
  );
};

export default Switch;
