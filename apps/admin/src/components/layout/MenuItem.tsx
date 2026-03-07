import Link from 'next/link';

import { SvgIconProps } from '@mui/material';
import { cn } from '@shared';

const MenuItem = ({
  name,
  isSelected,
  href,
  icon: Icon,
}: {
  name: string;
  isSelected: boolean;
  href: string;
  icon: React.ComponentType<SvgIconProps>;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1',
        isSelected ? 'bg-primary-50 text-primary-600' : 'text-gray-700',
      )}
    >
      <Icon className="text-5" />
      <span>{name}</span>
    </Link>
  );
};

export default MenuItem;
