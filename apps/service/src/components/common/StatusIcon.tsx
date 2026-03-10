import { CheckOutlinedIcon, DoNotIcon, PendingIcon } from '@icons';

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'REJECTED':
      return <DoNotIcon sx={{ width: 16 }} className="text-negative" />;
    case 'APPROVED':
      return <CheckOutlinedIcon sx={{ width: 16 }} className="text-positive" />;
    default:
      return <PendingIcon sx={{ width: 16 }} className="text-gray-500" />;
  }
};

export default StatusIcon;
