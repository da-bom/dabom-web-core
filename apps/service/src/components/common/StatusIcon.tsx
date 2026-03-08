import { CheckOutlinedIcon, DoNotIcon, PendingIcon } from '@icons';

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'REJECTED') return <DoNotIcon sx={{ width: 16 }} className="text-negative" />;
  if (status === 'APPROVED')
    return <CheckOutlinedIcon sx={{ width: 16 }} className="text-positive" />;
  return <PendingIcon sx={{ width: 16 }} className="text-gray-500" />;
};

export default StatusIcon;
