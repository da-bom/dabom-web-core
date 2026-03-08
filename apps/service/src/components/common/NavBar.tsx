'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ExtensionOutlined as ExtensionIcon,
  Face as FaceIcon,
  Home as HomeIcon,
  PersonOutlined as PersonIcon,
  StarBorder as StarIcon,
} from '@mui/icons-material';
import { cn } from '@shared';

const navItems = [
  { label: '미션', href: '/mission', icon: ExtensionIcon },
  { label: '가족', href: '/family', icon: FaceIcon },
  { label: '홈', href: '/home', isHome: true },
  { label: '어필', href: '/appeal', icon: StarIcon },
  { label: 'MY', href: '/mypage', icon: PersonIcon },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex justify-center">
      <div className="relative h-19 w-full">
        <div className="bg-background-sub absolute bottom-0 flex h-16 w-full items-center justify-between border-t border-gray-200 px-10 pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            if (item.isHome) {
              return <div key="home-placeholder" className="w-8" />;
            }

            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-2"
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex h-4 w-4 items-center justify-center">
                  {Icon && (
                    <Icon
                      sx={{
                        fontSize: 16,
                        color: isActive ? 'var(--color-primary)' : 'var(--color-gray-700)',
                      }}
                    />
                  )}
                </div>
                <span className={cn('text-caption-m', isActive ? 'text-primary' : 'text-gray-700')}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/home"
          className="bg-brand-dark absolute top-0 left-1/2 flex h-13 w-13 -translate-x-1/2 items-center justify-center rounded-full"
        >
          <HomeIcon width={17} height={19} className="text-white" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
