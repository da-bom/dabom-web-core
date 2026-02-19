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
}

const NavBar = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "홈", href: "/home", icon: "Home" },
      { label: "정책", href: "/policy", icon: "Policy" },
      { label: "알림", href: "/notification", icon: "Noti" },
      { label: "MY", href: "/mypage", icon: "My" },
    ],
    [],
  );

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] transition-all">
      <ul className="flex h-15 w-full items-center justify-around pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex h-full flex-col items-center justify-center space-y-1 transition-opacity duration-200 hover:opacity-80 ${
                  isActive ? "text-primary-500" : "text-gray-400"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon name={item.icon} />
                <span
                  className={`text-caption-m ${
                    isActive ? "text-primary-500" : "text-gray-700"
                  }`}
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
