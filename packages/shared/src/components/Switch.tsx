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
        'flex w-fit cursor-pointer items-center gap-1 rounded-full border px-4 py-0.5',
        type === 'primary' && 'border-primary-600 bg-primary-50',
        type === 'secondary' && 'border-primary-800',
        type === 'gray' && 'border-gray-800 bg-gray-100',

        size === 'sm' ? 'text-caption-d' : 'text-body2-d',
      )}
      onClick={onClick}
    >
      <div className="text-brand-dark text-body3-d">{children}</div>
      <RefreshIcon
        className={type === 'primary' ? 'text-primary-600' : 'text-gray-800'}
        sx={{ width: 16 }}
      />
    </button>
  );
};

export default Switch;
