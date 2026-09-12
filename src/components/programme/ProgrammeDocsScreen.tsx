"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ParticipantRole } from "@/lib/site";
import RoleNavigation from "@/components/navigation/RoleNavigation";
import {
  FileText,
  Plus,
  Image as ImageIcon,
  Lightbulb,
  Download,
} from "lucide-react";

interface Note {
  id: string;
  initials: string;
  author: string;
  organization: string;
  dayTag: string;
  content: string;
}

interface Resource {
  id: string;
  title: string;
  fileType: string;
  size: string;
  day: string;
}

const sessionNotes: Note[] = [
  {
    id: "1",
    initials: "MS",
    author: "Maria Schmick",
    organization: "Open Society Foundations",
    dayTag: "Day 1 · 14:30",
    content:
      "The rights-based approaches session surfaced strong demand for a shared learning platform. OSF will follow up with MENA Rights Group on joint programming opportunities in the Mediterranean region.",
  },
  {
    id: "2",
    initials: "JO",
    author: "James Odhiambo",
    organization: "CIVICUS Alliance",
    dayTag: "Day 1 · 16:00",
    content:
      "Digital Rights breakout: participants want a working group to share tools for operating in restricted digital environments. Interested orgs: Digital Frontiers, Access Now, EFF.",
  },
  {
    id: "3",
    initials: "AD",
    author: "Awa Diallo",
    organization: "Adaptation Fund",
    dayTag: "Day 2 · 11:15",
    content:
      "Strategic communications workshop highly rated. Rashida's adaptive messaging framework is directly applicable across 60% of the portfolio. Requesting follow-up toolkit.",
  },
  {
    id: "4",
    initials: "KM",
    author: "Kayden Mamu",
    organization: "Southern Africa Trust",
    dayTag: "Day 2 · 15:00",
    content:
      "Fishbowl revealed consensus: philanthropy needs to accept longer time horizons (10+ years) and better share learning. Key ask: OAK to publish failure cases alongside success stories.",
  },
];

const keyTakeaways = [
  "Philanthropy needs to accept 10+ year time horizons for systemic change",
  "Shared learning infrastructure is the most requested resource across the portfolio",
  "Digital rights must be integrated into all programme areas, not siloed",
  "Rights-based framing significantly improves grantee advocacy effectiveness",
  "Peer exchange is rated more valuable than expert-led sessions (92% vs 74%)",
];

const resources: Resource[] = [
  {
    id: "1",
    title: "Opening Plenary Presentation",
    fileType: "PDF",
    size: "3.2 MB",
    day: "Day 1",
  },
  {
    id: "2",
    title: "OAK Portfolio Overview 2024–26",
    fileType: "PDF",
    size: "1.8 MB",
    day: "Day 2",
  },
  {
    id: "3",
    title: "Action Planning Workbook",
    fileType: "DOCX",
    size: "2.1 MB",
    day: "Day 3",
  },
  {
    id: "4",
    title: "Partner Contact Directory",
    fileType: "XLSX",
    size: "0.4 MB",
    day: "All Days",
  },
  {
    id: "5",
    title: "Photo Gallery (High Res)",
    fileType: "ZIP",
    size: "142 MB",
    day: "All Days",
  },
];

export default function ProgrammeDocsScreen({ role }: { role: ParticipantRole }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"Schedule" | "Docs">("Docs");

  const goToSchedule = () => {
    setViewMode("Schedule");
    router.push("/program");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-28">
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

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
            Programme
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            OAK Partner Convening 2026
          </p>
        </div>

        <div className="bg-[#e2e8f0]/60 p-1 rounded-2xl flex items-center">
          <button
            onClick={goToSchedule}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              viewMode === "Schedule"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setViewMode("Docs")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              viewMode === "Docs"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Docs
          </button>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0f172a]">
              <FileText className="w-4 h-4 stroke-[2.5]" />
              <h2 className="text-sm font-black tracking-tight">
                Session Notes
              </h2>
            </div>
            <button
              onClick={() => alert("Add note modal...")}
              className="bg-[#1c355e] hover:bg-[#152a4a] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add Note</span>
            </button>
          </div>

          <div className="space-y-3">
            {sessionNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-slate-100 rounded-[22px] p-4 shadow-sm space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#213760] text-white flex items-center justify-center font-bold text-xs">
                      {note.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f172a] text-xs leading-none">
                        {note.author}
                      </h3>
                      <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                        {note.organization}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {note.dayTag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0f172a]">
              <ImageIcon className="w-4 h-4 stroke-[2.5]" />
              <h2 className="text-sm font-black tracking-tight">
                Photo Gallery
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              6 photos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="h-32 rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src="/Image%20(Opening%20plenary%20session).png"
                alt="Opening plenary session"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src="/Image%20(Keynote%20speaker).png"
                alt="Keynote speaker"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src="/Image%20(Workshop%20in%20progress).png"
                alt="Workshop in progress"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src="/Image%20(Roundtable%20discussion).png"
                alt="Roundtable discussion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src="/Image%20(Breakout%20group%20discussion).png"
                alt="Breakout group discussion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src="/Image%20(Welcome%20reception%20dinner).png"
                alt="Welcome reception dinner"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-[#0f172a]">
            <Lightbulb className="w-4 h-4 stroke-[2.5]" />
            <h2 className="text-sm font-black tracking-tight">Key Takeaways</h2>
          </div>

          <div className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm space-y-3.5">
            {keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1e3a6a] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-[#0f172a]">
            <Download className="w-4 h-4 stroke-[2.5]" />
            <h2 className="text-sm font-black tracking-tight">Resources</h2>
          </div>

          <div className="space-y-2.5">
            {resources.map((item) => (
              <div
                key={item.id}
                onClick={() => alert(`Downloading ${item.title}...`)}
                className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-[#1e3a6a] group-hover:text-white transition-colors">
                    <FileText className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f172a] text-xs">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                      {item.fileType} · {item.size} · {item.day}
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-[#1e3a6a] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <RoleNavigation role={role} />
    </div>
  );
}
