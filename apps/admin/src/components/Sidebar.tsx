"use client";

import { usePathname } from "next/navigation";
import router from "next/router";

import LogoutIcon from "@mui/icons-material/Logout";
import { Logo } from "@shared";
import { MENU } from "src/constants/MENU";
import { logout } from "src/hooks/useLogout";

import MenuItem from "./MenuItem";

const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="bg-brand-white flex h-screen w-62 flex-col justify-between border-r-[1px] border-gray-100 py-5">
      <div className="flex w-full flex-col items-center gap-7">
        <Logo type="admin" />
        <div className="w-38 border-[1px] border-gray-100" />

        <div className="flex w-full flex-col gap-5 px-2">
          {MENU.map((item) => {
            return (
              <MenuItem
                key={item.id}
                isSelected={pathname === item.path}
                name={item.label}
                href={item.path}
                icon={item.icon}
              />
            );
          })}
        </div>
      </div>
      <button
        className="flex cursor-pointer px-5 text-gray-400"
        onClick={handleLogout}
      >
        <LogoutIcon />
        <span>로그아웃</span>
      </button>
    </div>
  );
};

export default Sidebar;
