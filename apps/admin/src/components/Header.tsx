"use client";

import { usePathname } from "next/navigation";

import { MENU } from "src/constants/MENU";

const Header = () => {
  const pathname = usePathname();

  const name = "Admin";

  const currentMenu = MENU.find((item) => pathname.startsWith(item.path));

  return (
    <header className="mx-1 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-h1-d">{currentMenu?.label}</span>
        <span className="text-body2-d text-gray-800">
          {currentMenu?.description}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-body1-d">{name}</span>
      </div>
    </header>
  );
};

export default Header;
