'use client';

import { usePathname } from 'next/navigation';

import { MENU } from 'src/constants/MENU';

const Header = () => {
  const pathname = usePathname();

  // TODO: 내 정보 조회 API 이용하도록 수정
  const name = '홍길동';

  const currentMenu = MENU.find((item) => pathname.startsWith(item.path));

  return (
    <header className="mx-1 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-h2-d">{currentMenu?.label}</span>
        <span className="text-body2-d text-gray-800">{currentMenu?.description}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-body1-d">{name}</span>
      </div>
    </header>
  );
};

export default Header;
