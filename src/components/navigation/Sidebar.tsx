"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserPlus,
  Calendar,
  Globe,
  Scan,
  LayoutGrid,
} from "lucide-react";

const navItems = [
  { name: "Register", href: "/register", icon: UserPlus },
  { name: "Program", href: "/program", icon: Calendar },
  { name: "Partners", href: "/partners", icon: Globe },
  { name: "Check In", href: "/check-in", icon: Scan },
  { name: "Attendance", href: "/attendance", icon: LayoutGrid },
];

function isActivePath(pathname: string, href: string) {
  const normalizedPath = pathname === "/programme" ? "/program" : pathname;

  if (href === "/programme") {
    return normalizedPath === "/program" || normalizedPath.startsWith("/programme/");
  }
  if (href === "/partners") {
    return normalizedPath === "/partners" || normalizedPath.startsWith("/partners/");
  }
  if (href === "/checkin") {
    return normalizedPath === "/check-in" || normalizedPath.startsWith("/checkin/");
  }
  if (href === "/attendance") {
    return normalizedPath === "/attendance" || normalizedPath.startsWith("/attendance/");
  }
  return normalizedPath === href;
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col justify-between border-r border-gray-100 bg-white py-8 px-6 font-sans lg:flex">
      <div className="flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#3c5d80]">
              <Globe className="h-5 w-5 text-[#3c5d80]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-serif font-bold tracking-wider text-[#3c5d80]">
                OAK
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#3c5d80]">
                Foundation
              </span>
            </div>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#476585]">
            Partner Convening 2026
          </p>
        </div>

        <nav className="mt-4 space-y-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 transition-colors group ${
                  active ? "text-[#3d5a80]" : "text-[#506a85] hover:text-[#2c405a]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <div className="flex h-6 w-6 items-center justify-center">
                  <Icon
                    className={`h-6 w-6 stroke-[2.2] transition-colors ${
                      active
                        ? "text-[#3d5a80]"
                        : "text-[#506a85] group-hover:text-[#2c405a]"
                    }`}
                  />
                </div>
                <span className="text-base font-medium tracking-wide">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#ebf0f5]">
            <Globe className="h-6 w-6 text-[#506a85]" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold leading-tight text-[#1d2d42]">
              Harare, Zimbabwe
            </h4>
            <p className="mt-0.5 text-xs font-semibold text-[#7f93a7]">
              9–11 Nov 2026
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
