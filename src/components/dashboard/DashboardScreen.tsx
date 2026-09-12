"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Globe2, QrCode, Users } from "lucide-react";
import type { ParticipantSession } from "@/lib/session";
import RoleNavigation from "@/components/navigation/RoleNavigation";

const cards = [
  { href: "/program", label: "Event Program", description: "View sessions and event details", icon: CalendarDays },
  { href: "/partners", label: "Partner Directory", description: "Browse participating organisations", icon: Globe2 },
];

export default function DashboardScreen({ session }: { session: ParticipantSession }) {
  return (
    <div className="min-h-screen bg-oak-background pb-28 text-oak-text">
      <header className="bg-oak-navy px-6 py-4 text-white lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <span className="text-sm font-extrabold tracking-wide">OAK</span>
          <span className="h-6 w-px bg-white/30" />
          <span className="text-[11px] font-semibold tracking-[0.14em]">PARTNER CONVENING 2026</span>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pt-8">
        <p className="text-[11px] font-bold tracking-[0.14em] text-oak-label">WELCOME</p>
        <h1 className="mt-2 text-3xl font-extrabold text-oak-navy">Your Dashboard</h1>
        <p className="mt-2 text-sm text-oak-label">Signed in as {session.role}.</p>

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

        {session.role === "Presenter" && (
          <div className="mt-5 rounded-[28px] bg-oak-navy p-6 text-white">
            <Users className="h-6 w-6" />
            <h2 className="mt-3 font-extrabold">Presenter access</h2>
            <p className="mt-1 text-sm text-white/70">Use the event program to review your session details.</p>
          </div>
        )}
        {session.role === "Observer" && (
          <div className="mt-5 rounded-[28px] bg-white p-6 shadow-sm">
            <Globe2 className="h-6 w-6 text-oak-navy" />
            <h2 className="mt-3 font-extrabold text-oak-navy">Observer access</h2>
            <p className="mt-1 text-sm text-oak-label">Programme and partner information are available from your dashboard.</p>
          </div>
        )}
        {session.role === "OAK Staff" && (
          <div className="mt-5 rounded-[28px] bg-white p-6 shadow-sm">
            <QrCode className="h-6 w-6 text-oak-navy" />
            <h2 className="mt-3 font-extrabold text-oak-navy">Staff access</h2>
            <p className="mt-1 text-sm text-oak-label">Coordinate event information through the program and partner directory.</p>
          </div>
        )}
      </main>

      <RoleNavigation role={session.role} />
    </div>
  );
}
