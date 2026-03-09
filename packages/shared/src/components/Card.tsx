import { cn } from '../utils/cn';
import Button from './Button';
import DaboIcon from './DaboIcon';
import MainBox from './MainBox';

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Card = ({
  title,
  subtitle,
  description,
  buttonText,
  disabled = false,
  onClick,
  className,
}: CardProps) => {
  return (
    <MainBox className={cn('w-fill flex flex-col justify-between rounded-2xl p-4', className)}>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <DaboIcon type="default" width={20} />
          <span className="text-body2-m">{subtitle}</span>
        </div>
        <span className="text-body1-m">{title}</span>
      </div>
      <span className="text-caption-m text-gray-500">{description}</span>

      <Button
        size="sm"
        color={disabled ? 'gray' : 'light'}
        isFullWidth
        onClick={onClick}
        disabled={disabled}
      >
        {disabled ? '사용 완료' : buttonText}
      </Button>
    </MainBox>
  );
};

export default Card;
