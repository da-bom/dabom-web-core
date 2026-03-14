import { cn } from '../utils/cn';
import DaboIcon from './DaboIcon';
import MainBox from './MainBox';

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

const Card = ({ title, subtitle, description, className, children }: CardProps) => {
  return (
    <MainBox className={cn('w-fill flex flex-col justify-between rounded-2xl p-4', className)}>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <DaboIcon type="default" width={20} />
          <span className="text-body2-m">{subtitle}</span>
        </div>
        <span className="text-body1-m">{title}</span>
      </div>
      <span className="text-caption-m break-keep whitespace-pre-wrap text-gray-500">
        {description}
      </span>
      {children}
    </MainBox>
  );
};

export default Card;
