'use client';

import Link from 'next/link';

import { cn } from '@shared';

interface MenuItemProps {
  label: string;
  path: string;
  icon: React.ElementType;
  currentPath: string;
  subItems?: readonly { label: string; path: string }[];
}

const MenuItem = ({ label, path, icon: Icon, subItems, currentPath }: MenuItemProps) => {
  const hasSubItems = !!subItems;

  const isOpen = hasSubItems && currentPath.startsWith(path);
  const isParentActive = hasSubItems && isOpen;
  const isMainActive = !hasSubItems && currentPath === path;

  return (
    <div className="text-body1-m flex w-full flex-col gap-1">
      <Link
        href={hasSubItems ? subItems[0].path : path}
        onClick={(e) => {
          if (isParentActive) e.preventDefault();
        }}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-2 transition-colors',
          isMainActive || isParentActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700',
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>

      {hasSubItems && isOpen && (
        <div className="flex flex-col gap-1 pl-9">
          {subItems.map((sub) => {
            const isActive = currentPath === sub.path;
            return (
              <Link
                key={sub.path}
                href={sub.path}
                className={cn(
                  'text-body3-d rounded-md px-2 py-1 transition-colors',
                  isActive ? 'text-primary-600' : 'text-gray-500',
                )}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
