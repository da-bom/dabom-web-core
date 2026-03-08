import Button from './Button';
import DaboIcon from './DaboIcon';
import MainBox from './MainBox';

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
}

const Card = ({ title, subtitle, description, buttonText }: CardProps) => {
  return (
    <MainBox className="w-fill flex h-45 flex-col justify-between rounded-2xl p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <DaboIcon type="default" width={20} />
          <span className="text-body2-m">{subtitle}</span>
        </div>
      </div>
      <span className="text-body1-m">{title}</span>
      <span className="text-caption-m text-gray-700">{description}</span>
      <Button size="sm" color="light" isFullWidth>
        {buttonText}
      </Button>
    </MainBox>
  );
};

export default Card;
