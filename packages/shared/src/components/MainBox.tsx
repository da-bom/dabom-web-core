import { cn } from '../utils/cn';

const MainBox = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('bg-brand-white rounded-lg border border-gray-100', className)}>
      {children}
    </div>
  );
};

export default MainBox;
