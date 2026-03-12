import { Divider } from '@shared';

const DateDivider = ({ date }: { date: string }) => (
  <div className="flex items-center justify-center gap-4">
    <Divider className="borer-gray-300" />
    <span className="text-body2-m text-gray-600">{date}</span>
    <Divider className="borer-gray-300" />
  </div>
);

export default DateDivider;
