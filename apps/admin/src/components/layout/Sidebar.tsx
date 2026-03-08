'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Logo, LogoutIcon } from '@shared';

import { logout } from 'src/api/auth/useLogout';
import { MENU } from 'src/constants/MENU';

import MenuItem from './MenuItem';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="bg-brand-white flex h-screen w-62 flex-col justify-between border-r border-gray-100 py-5">
      <div className="flex w-full flex-col items-center gap-7">
        <Logo type="admin" width={152} />
        <div className="w-38 border border-gray-100" />

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
      <button className="flex cursor-pointer gap-2 px-5 text-gray-400" onClick={handleLogout}>
        <LogoutIcon
          sx={{
            width: 16,
          }}
        />
        <span className="text-body3-d">로그아웃</span>
      </button>
    </div>
  );
};

export default Sidebar;
