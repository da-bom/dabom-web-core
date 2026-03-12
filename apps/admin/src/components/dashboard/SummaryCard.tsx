import { MainBox } from '@shared';

const SummaryCard = ({
  title,
  value,
  subValue,
  label,
}: {
  title: string;
  value: number | string;
  subValue?: number | string;
  label?: string;
}) => (
  <MainBox className="flex w-full flex-col items-center gap-4 p-5">
    <span className="text-body2-d text-primary-600 font-bold">{title}</span>
    <span className="text-h1-d">{value.toLocaleString()}</span>
    <span className="text-body2-d text-gray-700">
      {label} {subValue?.toLocaleString()}
    </span>
  </MainBox>
);

export default SummaryCard;
