import { cn } from '../utils/cn';

const MainBox = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn('bg-brand-white rounded-lg border border-gray-100', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MainBox;
