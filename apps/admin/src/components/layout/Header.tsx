'use client';

import { usePathname } from 'next/navigation';

import { getMenu } from 'src/utils/getMenu';

const Header = () => {
  const pathname = usePathname();
  const menuInfo = getMenu(pathname);

  return (
    <header className="mx-1 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-h2-d">{menuInfo?.parentLabel}</span>
        <span className="text-body2-d text-gray-800">{menuInfo?.description}</span>
      </div>
    </header>
  );
};

export default Header;
