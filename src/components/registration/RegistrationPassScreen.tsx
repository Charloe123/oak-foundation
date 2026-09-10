"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Download,
  UserPlus,
  Calendar,
  Globe,
} from "lucide-react";

export default function RegistrationPassScreen() {
  const [activeTab, setActiveTab] = useState<"register" | "programme" | "partners">("register");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-24">
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
              Tinashe!
            </h1>
            <p className="text-xs font-medium text-slate-300 pt-0.5">
              uncommon.org
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm text-center space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
            Your Entry Pass
          </h2>

          <div className="bg-slate-100/70 p-6 rounded-[28px] inline-block border border-slate-200/50">
            <svg
              className="w-48 h-48 text-[#122b52]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2 2h7v7H2V2zm2 2v3h3V4H4z" />
              <path d="M5 5h1v1H5z" />
              <path d="M15 2h7v7h-7V2zm2 2v3h3V4h-3z" />
              <path d="M18 5h1v1h-1z" />
              <path d="M2 15h7v7H2v-7zm2 2v3h3v-3H4z" />
              <path d="M5 18h1v1H5z" />
              <path d="M11 2h2v3h-2zm-1 4h2v2h-2zm3 0h2v1h-2zm-3 3h1v2h-1zm3 0h3v1h-3zm-5 2h2v2H8zm3 0h1v1h-1zm3 0h2v3h-2zm4-2h3v2h-3zm0 3h2v2h-2zm-9 3h3v1h-3zm4 0h1v3h-1zm2 0h2v1h-2zm3 0h1v1h-1zm-9 2h1v2H8zm2 0h2v1h-2zm3 0h1v3h-1zm2 0h3v1h-3zm-5 2h2v1h-2zm4 0h3v1h-3z" />
            </svg>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-500 tracking-wider font-mono">
              OAK-2026-7842-XKPH
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
              <span className="font-bold text-slate-900">tinashe</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Organisation</span>
              <span className="font-bold text-slate-900">uncommon.org</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Role</span>
              <span className="font-bold text-slate-900">Partner</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Location</span>
              <span className="font-bold text-slate-900">Harare, Zimbabwe</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert("Downloading QR Code...")}
          className="w-full bg-[#1e3a6d] hover:bg-[#162d56] active:scale-[0.99] text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/10 transition-all flex items-center justify-center gap-2.5 text-sm"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Download QR Code</span>
        </button>

      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 shadow-lg z-50">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setActiveTab("register")}
            className={`flex flex-col items-center py-1.5 px-5 rounded-2xl transition-all ${
              activeTab === "register"
                ? "bg-slate-100/80 text-[#122b52]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <UserPlus className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] font-bold mt-1">Register</span>
          </button>

          <button
            onClick={() => setActiveTab("programme")}
            className={`flex flex-col items-center py-1.5 px-5 rounded-2xl transition-all ${
              activeTab === "programme"
                ? "bg-slate-100/80 text-[#122b52]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Calendar className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-bold mt-1">Programme</span>
          </button>

          <button
            onClick={() => setActiveTab("partners")}
            className={`flex flex-col items-center py-1.5 px-5 rounded-2xl transition-all ${
              activeTab === "partners"
                ? "bg-slate-100/80 text-[#122b52]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Globe className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-bold mt-1">Partners</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
