"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Globe2, ScanLine, Users } from "lucide-react";
import type { ParticipantSession } from "@/lib/session";
import RoleNavigation from "@/components/navigation/RoleNavigation";

const cards = [
  { href: "/check-in", label: "Check In", description: "Scan participant QR codes", icon: ScanLine },
  { href: "/attendance", label: "Attendance", description: "Review check-in totals and participant status", icon: Users },
  { href: "/program", label: "Program", description: "View the event schedule", icon: CalendarDays },
  { href: "/partners", label: "Partners", description: "Browse participating organisations", icon: Globe2 },
];

export default function CoordinationScreen({ session }: { session: ParticipantSession }) {
  return (
    <div className="min-h-screen bg-oak-background pb-28 text-oak-text">
      <header className="bg-oak-navy px-6 py-4 text-white">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <span className="text-sm font-extrabold tracking-wide">OAK</span>
          <span className="h-6 w-px bg-white/30" />
          <span className="text-[11px] font-semibold tracking-[0.14em]">COORDINATION TEAM</span>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pt-8">
        <p className="text-[11px] font-bold tracking-[0.14em] text-oak-label">EVENT OPERATIONS</p>
        <h1 className="mt-2 text-3xl font-extrabold text-oak-navy">Coordination Dashboard</h1>
        <p className="mt-2 text-sm text-oak-label">Manage check-in and attendance for 9–11 November 2026.</p>

        <div className="mt-6 grid gap-4">
          {cards.map(({ href, label, description, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-[28px] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-oak-navy" />
                <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1" />
              </div>
              <h2 className="mt-5 font-extrabold text-oak-navy">{label}</h2>
              <p className="mt-1 text-sm text-oak-label">{description}</p>
            </Link>
          ))}
        </div>
      </main>

      <RoleNavigation role={session.role} />
    </div>
  );
}
