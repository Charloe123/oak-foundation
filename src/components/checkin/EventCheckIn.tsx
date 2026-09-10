"use client";

import { useState } from "react";
import { Scan } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  code: string;
  initials: string;
  role: string;
  roleType: "partner" | "staff" | "coordination";
}

const attendees: Attendee[] = [
  {
    id: "1",
    name: "Collin Manyande",
    code: "OAK-2026-7842-XKPH",
    initials: "MS",
    role: "Partner",
    roleType: "partner",
  },
  {
    id: "2",
    name: "James Odhiambo",
    code: "OAK-2026-1193-JWQA",
    initials: "JO",
    role: "OAK Staff",
    roleType: "staff",
  },
  {
    id: "3",
    name: "Awa Diallo",
    code: "OAK-2026-3310-ADGE",
    initials: "AD",
    role: "Coordination Team",
    roleType: "coordination",
  },
  {
    id: "4",
    name: "Kayden Mamu",
    code: "OAK-2026-5592-FWBN",
    initials: "KM",
    role: "Partner",
    roleType: "partner",
  },
];

export default function EventCheckIn() {
  const [manualCode, setManualCode] = useState("");

  const handleCheckIn = (code: string) => {
    alert(`Checking in: ${code}`);
  };

  const getBadgeStyle = (type: Attendee["roleType"]) => {
    switch (type) {
      case "partner":
        return "bg-[#f0f3fa] text-[#2b3a67] border-[#e2e8f0]";
      case "staff":
        return "bg-[#eafbf3] text-[#0d824d] border-[#bbf7d0]";
      case "coordination":
        return "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDotColor = (type: Attendee["roleType"]) => {
    switch (type) {
      case "partner":
        return "bg-[#2b3a67]";
      case "staff":
        return "bg-[#10b981]";
      case "coordination":
        return "bg-[#f97316]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 flex justify-center items-center font-sans">
      <div className="w-full max-w-[480px] space-y-6">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight">
            Event Check-In
          </h1>
          <p className="text-sm font-medium text-[#64748b]">
            Scan an attendee QR code to check them in
          </p>
        </header>

        <div className="bg-[#0b1329] rounded-[28px] overflow-hidden shadow-xl text-white relative">
          <div className="h-[360px] relative flex flex-col items-center justify-between p-6">
            <div className="relative w-[240px] h-[240px] my-auto flex items-center justify-center">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/80 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/80 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/80 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/80 rounded-br-2xl" />

              <span className="text-xs font-medium text-slate-400/80 tracking-wide select-none">
                Position QR code within the frame
              </span>
            </div>
          </div>

          <div className="bg-[#0f1938] px-5 py-4 border-t border-white/5 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 text-slate-300">
              <Scan className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Hold camera steady · Auto-scans in 1–2 seconds
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Simulate QR Scan
          </h2>

          <div className="space-y-3">
            {attendees.map((attendee) => (
              <div
                key={attendee.id}
                onClick={() => handleCheckIn(attendee.code)}
                className="flex items-center justify-between p-3.5 border border-slate-200/80 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#233862] text-white flex items-center justify-center font-bold text-sm">
                    {attendee.initials}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0f172a] text-sm leading-snug">
                      {attendee.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 tracking-wide">
                      {attendee.code}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${getBadgeStyle(
                    attendee.roleType
                  )}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getDotColor(
                      attendee.roleType
                    )}`}
                  />
                  <span>{attendee.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Manual Code Entry
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="OAK-2026-XXXX-XXXX"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-[#f1f5f9] border border-transparent rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all uppercase"
            />
            <button
              onClick={() => handleCheckIn(manualCode)}
              className="bg-[#233862] hover:bg-[#1b2b4d] active:scale-[0.98] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center"
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
