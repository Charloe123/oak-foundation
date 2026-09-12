"use client";

import { XCircle, AlertTriangle, RotateCcw, Phone } from "lucide-react";

export default function CheckInFailedScreen() {
  const handleTryAgain = () => {
    alert("Navigating to scanner...");
  };

  const handleContactSupport = () => {
    alert("Calling Coordination Team...");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-12">
      <header className="bg-[#122b52] text-white px-6 py-4 flex items-center justify-between shadow-sm lg:hidden">
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
        <div className="bg-[#e53935] rounded-[24px] p-6 text-white shadow-lg shadow-red-500/10 flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md text-white flex-shrink-0 mt-0.5">
            <XCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold tracking-wider text-red-100 uppercase">
              Check-In Failed
            </p>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight">
              QR Not Recognised
            </h1>
            <p className="text-xs font-medium text-red-100 pt-0.5">
              Code is invalid or unregistered
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-[#0f172a]">
            <AlertTriangle className="w-4 h-4 text-[#e53935] stroke-[2.5]" />
            <h2 className="text-sm font-bold tracking-tight">
              Possible reasons
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-100 border-[3px] border-[#e53935] flex-shrink-0" />
              <span>QR code belongs to a different event</span>
            </li>

            <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-100 border-[3px] border-[#e53935] flex-shrink-0" />
              <span>Registration was not completed</span>
            </li>

            <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-100 border-[3px] border-[#e53935] flex-shrink-0" />
              <span>Code has been altered or corrupted</span>
            </li>

            <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-100 border-[3px] border-[#e53935] flex-shrink-0" />
              <span>Attendee registered under a different email</span>
            </li>
          </ul>
        </div>

        <button
          onClick={handleTryAgain}
          className="w-full bg-[#233a6b] hover:bg-[#1a2c53] active:scale-[0.99] text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 text-sm"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5]" />
          <span>Try Again</span>
        </button>

        <button
          onClick={handleContactSupport}
          className="w-full bg-white border border-slate-100 hover:bg-slate-50 active:scale-[0.99] text-[#0f172a] font-bold py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2.5 text-sm"
        >
          <Phone className="w-4 h-4 stroke-[2.5] text-slate-700" />
          <span>Contact Coordination Team</span>
        </button>
      </main>
    </div>
  );
}
