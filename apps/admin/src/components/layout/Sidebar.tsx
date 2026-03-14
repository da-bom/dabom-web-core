'use client';

import { usePathname, useRouter } from 'next/navigation';

import { LogoutIcon } from '@icons';
import { Divider, Logo } from '@shared';

import { logout } from 'src/api/auth/useAdminLogout';
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
    <div className="bg-brand-white flex h-screen w-fit flex-shrink-0 flex-col border-r border-gray-100 py-5">
      <div className="mx-4 flex flex-col items-center gap-7">
        <Logo type="admin" width={152} />
        <Divider />
      </div>
      <div className="flex w-full flex-1 flex-col gap-5 px-2">
        {MENU.map((item) => {
          return (
            <MenuItem
              key={item.id}
              path={item.path}
              label={item.label}
              icon={item.icon}
              currentPath={pathname}
              subItems={'subItems' in item ? item.subItems : undefined}
            />
          );
        })}
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
