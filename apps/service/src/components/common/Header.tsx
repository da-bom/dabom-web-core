'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ChevronIcon, NotificationIcon } from '@icons';
import { Logo, cn } from '@shared';

interface HeaderProps {
  isBackVisible?: boolean;
  isNotiVisible?: boolean;
  onBackClick?: () => void;
  onNotiClick?: () => void;
  className?: string;
}

const Header = ({
  isBackVisible,
  isNotiVisible,
  onBackClick,
  onNotiClick,
  className,
}: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const HIDE_BACK_BTN_PATHS = ['/home', '/notification', '/policy'];
  const HIDE_NOTI_BTN_PATHS = ['/home', '/notification', '/policy'];

  const shouldShowBack = isBackVisible ?? !HIDE_BACK_BTN_PATHS.includes(pathname);
  const shouldShowNoti = isNotiVisible ?? !HIDE_NOTI_BTN_PATHS.includes(pathname);

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }
    router.back();
  };

  const handleNotiClick = () => {
    if (onNotiClick) {
      onNotiClick();
      return;
    }

    router.push('/notification');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 w-full items-center justify-between px-5',
        className,
      )}
    >
      <div className="flex items-center justify-center">
        {shouldShowBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로 가기"
            className="flex cursor-pointer items-center justify-center"
          >
            <ChevronIcon sx={{ width: 16, height: 12 }} className="rotate-180" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Logo type="default" width={69} height={16} />
      </div>

      <div className="flex items-center justify-center">
        {shouldShowNoti && (
          <button
            type="button"
            onClick={handleNotiClick}
            aria-label="알림 보기"
            className="flex cursor-pointer items-center justify-center"
          >
            <NotificationIcon width={13} height={16} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
