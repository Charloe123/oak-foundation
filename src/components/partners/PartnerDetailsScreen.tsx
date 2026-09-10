"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Globe,
  ExternalLink,
  Mail,
  ChevronRight,
  UserPlus,
  Calendar,
} from "lucide-react";

export default function PartnerDetailsScreen() {
  const [activeNavTab, setActiveNavTab] = useState<
    "register" | "programme" | "partners"
  >("partners");

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
        <button
          onClick={() => alert("Navigating back to Partner Directory...")}
          className="inline-flex items-center gap-1 text-sm font-bold text-[#122b52] hover:text-[#0a1a33] transition-colors"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Partner Directory</span>
        </button>

        <div className="bg-[#122b52] rounded-[28px] p-6 text-white shadow-lg space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2a436e] text-white flex items-center justify-center font-extrabold text-base tracking-wider flex-shrink-0">
              OSF
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                Foundation · Partner since 2018
              </p>
              <h1 className="text-2xl font-black leading-tight tracking-tight">
                Open Society <br />
                Foundations
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2a436e]/80 text-slate-200">
              Democracy
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2a436e]/80 text-slate-200">
              Human Rights
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2a436e]/80 text-slate-200">
              Justice
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-2.5">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            About
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Open Society Foundations builds vibrant and tolerant democracies.
            OAK partnership covers digital rights and justice initiatives across
            Eastern Europe and Central Asia.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-3">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Contact at Convening
          </h2>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#122b52] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              MS
            </div>

            <div>
              <h3 className="font-extrabold text-[#0f172a] text-sm leading-snug">
                Maria Schmidt
              </h3>
              <p className="text-xs font-medium text-slate-400">
                m.schmidt@osf.org
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://opensocietyfoundations.org"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#122b52] hover:bg-[#0a1a33] active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 stroke-[2]" />
            <span>Visit Website</span>
          </div>
          <ExternalLink className="w-4 h-4 stroke-[2.5]" />
        </a>

        <button
          onClick={() => alert("Opening message modal...")}
          className="w-full bg-white border border-slate-100 hover:bg-slate-50 active:scale-[0.99] text-[#0f172a] font-bold py-4 px-6 rounded-2xl shadow-sm transition-all flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 stroke-[2] text-slate-700" />
            <span>Send Message</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2.5]" />
        </button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 shadow-lg z-50">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setActiveNavTab("register")}
            className={`flex flex-col items-center py-1.5 px-5 rounded-2xl transition-all ${
              activeNavTab === "register"
                ? "bg-slate-100/80 text-[#122b52]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <UserPlus className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] font-bold mt-1">Register</span>
          </button>

          <button
            onClick={() => setActiveNavTab("programme")}
            className={`flex flex-col items-center py-1.5 px-5 rounded-2xl transition-all ${
              activeNavTab === "programme"
                ? "bg-slate-100/80 text-[#122b52]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Calendar className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-bold mt-1">Programme</span>
          </button>

          <button
            onClick={() => setActiveNavTab("partners")}
            className={`flex flex-col items-center py-1.5 px-5 rounded-2xl transition-all ${
              activeNavTab === "partners"
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
