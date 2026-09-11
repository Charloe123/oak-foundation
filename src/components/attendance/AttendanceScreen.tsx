"use client";

import { useRouter } from "next/navigation";
import type { ParticipantRole } from "@/lib/site";
import RoleNavigation from "@/components/navigation/RoleNavigation";
import { Scan, Users } from "lucide-react";

export default function AttendanceScreen({ role }: { role: ParticipantRole }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-28">
      <header className="bg-[#122b52] text-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center font-serif text-lg font-extrabold tracking-wider border-r border-white/20 pr-3">
            OAK
            <span className="text-[9px] uppercase tracking-normal font-sans block text-slate-300 -mt-1 ml-0.5">
              Foundation
            </span>
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
            Partner Convening 2026
          </span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-5">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
            Attendance
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            Check-in tracking · 9–11 November 2026
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#f1f5f9] text-slate-400 flex items-center justify-center">
            <Users className="w-8 h-8 stroke-[1.8]" />
          </div>

          <div className="space-y-1.5 max-w-[280px]">
            <h2 className="text-lg font-extrabold text-[#0f172a] tracking-tight">
              No check-ins yet
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Attendees will appear here once they have been scanned in at the
              event entrance.
            </p>
          </div>

          <button
            onClick={() => router.push("/check-in")}
            className="mt-2 bg-[#1b335a] hover:bg-[#122442] active:scale-[0.98] text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 text-xs"
          >
            <Scan className="w-4 h-4 stroke-[2.5]" />
            <span>Go to Check-In Scanner</span>
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-3.5">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Event Overview
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#f1f5f9]/80 rounded-2xl p-4 text-center space-y-0.5">
              <p className="text-2xl font-black text-[#0f172a]">110</p>
              <p className="text-[11px] font-semibold text-slate-400">
                Expected
              </p>
            </div>

            <div className="bg-[#f1f5f9]/80 rounded-2xl p-4 text-center space-y-0.5">
              <p className="text-2xl font-black text-[#0f172a]">0</p>
              <p className="text-[11px] font-semibold text-slate-400">
                Checked In
              </p>
            </div>

            <div className="bg-[#f1f5f9]/80 rounded-2xl p-4 text-center space-y-0.5">
              <p className="text-2xl font-black text-[#0f172a]">110</p>
              <p className="text-[11px] font-semibold text-slate-400">
                Pending
              </p>
            </div>
          </div>
        </div>
      </main>

      <RoleNavigation role={role} />
    </div>
  );
}
