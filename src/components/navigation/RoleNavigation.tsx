"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarDays, Globe2, LayoutDashboard, LogOut, QrCode, ScanLine, Users } from "lucide-react";
import type { ParticipantRole } from "@/lib/site";
import { logoutParticipant } from "@/app/actions";

const baseClasses = "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] font-bold transition-colors";
const activeClasses = "bg-slate-100/90 text-oak-navy";
const inactiveClasses = "text-slate-400 hover:text-slate-600";

export default function RoleNavigation({ role }: { role: ParticipantRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const isCoordination = role === "Coordination Team";
  const isPartner = role === "Partner";

  async function handleLogout() {
    setLoggingOut(true);
    await logoutParticipant();
    router.replace("/");
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/80 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {isPartner ? (
          <>
            <NavLink href="/qr-code" label="QR Code" active={pathname === "/qr-code"} icon={<QrCode className="h-5 w-5" />} />
            <NavLink href="/program" label="Program" active={pathname === "/program" || pathname.startsWith("/program/")} icon={<CalendarDays className="h-5 w-5" />} />
            <NavLink href="/partners" label="Partners" active={pathname === "/partners" || pathname.startsWith("/partners/")} icon={<Globe2 className="h-5 w-5" />} />
          </>
        ) : isCoordination ? (
          <>
            <NavLink href="/coordination" label="Coordination" active={pathname === "/coordination"} icon={<LayoutDashboard className="h-5 w-5" />} />
            <NavLink href="/check-in" label="Check In" active={pathname === "/checkin"} icon={<ScanLine className="h-5 w-5" />} />
            <NavLink href="/attendance" label="Attendance" active={pathname === "/attendance"} icon={<Users className="h-5 w-5" />} />
            <NavLink href="/program" label="Program" active={pathname === "/programme" || pathname.startsWith("/programme/")} icon={<CalendarDays className="h-5 w-5" />} />
            <NavLink href="/partners" label="Partners" active={pathname === "/partners" || pathname.startsWith("/partners/")} icon={<Globe2 className="h-5 w-5" />} />
          </>
        ) : (
          <>
            <NavLink href="/dashboard" label="Dashboard" active={pathname === "/dashboard"} icon={<LayoutDashboard className="h-5 w-5" />} />
            <NavLink href="/program" label="Program" active={pathname === "/program" || pathname.startsWith("/program/")} icon={<CalendarDays className="h-5 w-5" />} />
            <NavLink href="/partners" label="Partners" active={pathname === "/partners" || pathname.startsWith("/partners/")} icon={<Globe2 className="h-5 w-5" />} />
          </>
        )}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className={`${baseClasses} ${inactiveClasses} disabled:opacity-50`}
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active, icon }: { href: string; label: string; active: boolean; icon: React.ReactNode }) {
  return (
    <Link href={href} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
