import Button from './Button';
import DaboIcon from './DaboIcon';
import MainBox from './MainBox';

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  type: string;
  disabled: boolean;
}

const Card = ({ title, subtitle, description, type, disabled }: CardProps) => {
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

      {disabled ? (
        <Button size="sm" color="light" isFullWidth>
          {type === 'data' ? '데이터 사용하기' : '기프티콘 보기'}
        </Button>
      ) : (
        <Button size="sm" color="gray" isFullWidth>
          사용 완료
        </Button>
      )}
    </MainBox>
  );
};

export default Card;
