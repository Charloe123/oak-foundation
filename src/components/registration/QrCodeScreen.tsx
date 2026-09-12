import Link from "next/link";
import { CheckCircle2, RotateCcw } from "lucide-react";
import type { ParticipantSession } from "@/lib/session";
import { QrCodeFigure } from "./QrCodeFigure";
import QrDownloadButton from "./QrDownloadButton";
import RoleNavigation from "@/components/navigation/RoleNavigation";

export default function QrCodeScreen({ session }: { session: ParticipantSession }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-24">
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
        <div className="bg-gradient-to-r from-[#1b365d] to-[#25426e] rounded-[24px] p-6 text-white shadow-md flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md text-white flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
              Registration Complete
            </p>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight">
              You&apos;re Registered, <br />
              {session.firstName}!
            </h1>
            <p className="text-xs font-medium text-slate-300 pt-0.5">
              {session.organization}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm text-center space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
            Your Entry Pass
          </h2>

          <QrCodeFigure qrToken={session.qrToken} />

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-500 tracking-wider font-mono">
              {session.registrationId}
            </p>
            <p className="text-xs text-slate-400 font-medium">
              Present at event entrance for check-in
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-2">
            Registration Details
          </h2>

          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Name</span>
              <span className="font-bold text-slate-900">{session.firstName} {session.lastName}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Organisation</span>
              <span className="font-bold text-slate-900">{session.organization}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Role</span>
              <span className="font-bold text-slate-900">{session.role}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Location</span>
              <span className="font-bold text-slate-900">Harare, Zimbabwe</span>
            </div>
          </div>
        </div>

        <QrDownloadButton registrationId={session.registrationId} qrToken={session.qrToken} />

        <Link
          href="/register"
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Register another attendee</span>
        </Link>
      </main>

      <RoleNavigation role={session.role} />
    </div>
  );
}
