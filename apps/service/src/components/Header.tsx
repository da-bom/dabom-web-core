"use client";

import { usePathname, useRouter } from "next/navigation";

import { Icon, cn } from "@shared";

interface HeaderProps {
  isBackVisible?: boolean;
  onBackClick?: () => void;
  className?: string;
}

const Header = ({
  isBackVisible = true,
  className,
  onBackClick,
}: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const HIDE_BACK_BTN_PATHS = ["/home", "/notification", "/policy"];
  const shouldShowBack =
    isBackVisible && !HIDE_BACK_BTN_PATHS.includes(pathname);

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }
    router.back();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white shadow-sm transition-all",
        className,
      )}
    >
      <div className="flex w-10 items-center justify-start">
        {shouldShowBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
          >
            <Icon name="Chevron" width={9.5} height={16} />
          </button>
        )}
      </div>

      <div>
        <Icon name="Logo" width={66} height={12} aria-label="DABOM Logo" />
      </div>
      <div className="flex w-10 items-center"></div>
    </header>
  );
};

export default Header;
