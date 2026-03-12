import { cn } from '../utils/cn';

const Divider = ({ className }: { className?: string }) => {
  return <div className={cn('w-full border-t border-gray-100', className)} />;
};

export default Divider;
