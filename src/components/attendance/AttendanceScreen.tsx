'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface AttendanceScreenProps {
  expectedCount?: number;
  checkedInCount?: number;
}

export default function AttendanceScreen({
  expectedCount = 110,
  checkedInCount = 0,
}: AttendanceScreenProps) {
  const pendingCount = expectedCount - checkedInCount;

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-start font-sans antialiased text-slate-800">
      <nav className="w-full bg-[#183059] text-white py-4 px-6 flex items-center gap-3 border-b border-slate-800/20">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <span className="font-extrabold tracking-wider text-sm text-slate-100">
            OAK
          </span>
        </div>

        <div className="h-4 w-[1px] bg-slate-400/40" />

        <span className="text-[11px] font-bold tracking-widest text-slate-200 uppercase">
          PARTNER CONVENING 2026
        </span>
      </nav>

      <main className="w-full max-w-[420px] p-4 sm:p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0D182E]">
            Attendance
          </h1>
          <p className="text-sm font-medium text-slate-400">
            Check-in tracking · 9–11 March 2026
          </p>
        </header>

        <div className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#EFEFF4]/70 flex items-center justify-center">
            <Users className="w-9 h-9 text-slate-400/80 stroke-[1.8]" />
          </div>

          <div className="space-y-2 max-w-[280px]">
            <h2 className="text-xl font-bold text-[#0D182E] tracking-tight">
              No check-ins yet
            </h2>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Attendees will appear here once they have been scanned in at the event entrance.
            </p>
          </div>
        </div>

        <section className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Event Overview
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#EFEFF4]/60 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-[#0D182E]">
                {expectedCount}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                Expected
              </span>
            </div>

            <div className="bg-[#EFEFF4]/60 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-[#0D182E]">
                {checkedInCount}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                Checked In
              </span>
            </div>

            <div className="bg-[#EFEFF4]/60 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-[#0D182E]">
                {pendingCount}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                Pending
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
