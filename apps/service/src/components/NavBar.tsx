"use client";

import { useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@shared";

import { IconName } from "@shared/type/icon";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  activeIcon: IconName;
}

const NavBar = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "홈", href: "/", icon: "Home", activeIcon: "HomeColor" },
      {
        label: "정책",
        href: "/policy",
        icon: "Policy",
        activeIcon: "PolicyColor",
      },
      {
        label: "알림",
        href: "/notification",
        icon: "Noti",
        activeIcon: "NotiColor",
      },
      { label: "MY", href: "/mypage", icon: "My", activeIcon: "MyColor" },
    ],
    [],
  );

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] transition-all">
      <ul className="flex h-[60px] w-full items-center justify-around pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className="flex h-full flex-col items-center justify-center space-y-[4px] transition-opacity duration-200 hover:opacity-80"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon name={isActive ? item.activeIcon : item.icon} />
                <span
                  className={`text-caption-m ${isActive ? "text-pink-500" : "text-gray-400"} `}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
