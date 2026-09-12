"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, ChevronDown, ChevronUp } from "lucide-react";

type SessionType = "Plenary" | "Breakout" | "Workshop" | "Social";

interface Session {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  speaker?: string;
  organization?: string;
  location: string;
  type: SessionType;
}

const sessionsData: Session[] = [
  {
    id: "1",
    startTime: "10:50",
    endTime: "12:00",
    title: "Thematic Dialogue: Climate Justice & Grantmaking",
    speaker: "Samuel Okafor",
    organization: "Africa Climate Alliance",
    location: "Conference Room B2",
    type: "Breakout",
  },
  {
    id: "2",
    startTime: "10:50",
    endTime: "12:00",
    title: "Workshop: Measuring Long-term Change",
    speaker: "Dr. Ingrid Holm",
    organization: "Nordic Evaluation Centre",
    location: "Workshop Room C",
    type: "Workshop",
  },
  {
    id: "3",
    startTime: "13:30",
    endTime: "14:30",
    title: "Partner Spotlight: Rights-Based Approaches",
    speaker: "Fatima Zahra Benali",
    organization: "MENA Rights Group",
    location: "Main Hall A",
    type: "Plenary",
  },
  {
    id: "4",
    startTime: "14:45",
    endTime: "16:00",
    title: "Digital Rights in Authoritarian Contexts",
    speaker: "Li Wei",
    organization: "Digital Frontiers Institute",
    location: "Conference Room B1",
    type: "Breakout",
  },
  {
    id: "5",
    startTime: "18:00",
    endTime: "20:00",
    title: "Welcome Reception & Dinner",
    location: "Rooftop Terrace",
    type: "Social",
  },
];

export default function ProgrammeScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"Schedule" | "Docs">("Schedule");
  const [selectedDay, setSelectedDay] = useState(1);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const goToDocs = () => {
    setViewMode("Docs");
    router.push("/program/docs");
  };

  const toggleAccordion = (id: string) => {
    setExpandedSessionId(expandedSessionId === id ? null : id);
  };

  const getBadgeStyles = (type: SessionType) => {
    switch (type) {
      case "Plenary":
        return "bg-[#eef2ff] text-[#3730a3] border-[#c7d2fe]";
      case "Breakout":
        return "bg-[#fef9c3] text-[#854d0e] border-[#fef08a]";
      case "Workshop":
        return "bg-[#f3e8ff] text-[#6b21a8] border-[#e9d5ff]";
      case "Social":
        return "bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]";
    }
  };

  const getDotColor = (type: SessionType) => {
    switch (type) {
      case "Plenary":
        return "bg-[#3730a3]";
      case "Breakout":
        return "bg-[#ca8a04]";
      case "Workshop":
        return "bg-[#9333ea]";
      case "Social":
        return "bg-[#ea580c]";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-16">
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
            onClick={() => setViewMode("Schedule")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              viewMode === "Schedule"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Schedule
          </button>
          <button
            onClick={goToDocs}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              viewMode === "Docs"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Docs
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedDay(1)}
            className={`p-4 rounded-2xl text-left transition-all ${
              selectedDay === 1
                ? "bg-[#122b52] text-white shadow-lg shadow-indigo-950/10"
                : "bg-white text-[#0f172a] border border-slate-100 hover:border-slate-200"
            }`}
          >
            <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedDay === 1 ? "text-slate-300" : "text-slate-400"}`}>
              Mon
            </p>
            <p className="text-lg font-black leading-tight">Day 1</p>
            <p className={`text-xs font-medium ${selectedDay === 1 ? "text-slate-300" : "text-slate-400"}`}>
              9 Nov
            </p>
          </button>

          <button
            onClick={() => setSelectedDay(2)}
            className={`p-4 rounded-2xl text-left transition-all ${
              selectedDay === 2
                ? "bg-[#122b52] text-white shadow-lg shadow-indigo-950/10"
                : "bg-white text-[#0f172a] border border-slate-100 hover:border-slate-200"
            }`}
          >
            <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedDay === 2 ? "text-slate-300" : "text-slate-400"}`}>
              Tue
            </p>
            <p className="text-lg font-black leading-tight">Day 2</p>
            <p className={`text-xs font-medium ${selectedDay === 2 ? "text-slate-300" : "text-slate-400"}`}>
              10 Nov
            </p>
          </button>

          <button
            onClick={() => setSelectedDay(3)}
            className={`p-4 rounded-2xl text-left transition-all ${
              selectedDay === 3
                ? "bg-[#122b52] text-white shadow-lg shadow-indigo-950/10"
                : "bg-white text-[#0f172a] border border-slate-100 hover:border-slate-200"
            }`}
          >
            <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedDay === 3 ? "text-slate-300" : "text-slate-400"}`}>
              Wed
            </p>
            <p className="text-lg font-black leading-tight">Day 3</p>
            <p className={`text-xs font-medium ${selectedDay === 3 ? "text-slate-300" : "text-slate-400"}`}>
              11 Nov
            </p>
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#122b52] via-[#1a386b] to-[#122240] rounded-[28px] p-6 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
            <Star className="w-3.5 h-3.5 fill-slate-300 text-slate-300" />
            <span>Featured</span>
            <span>·</span>
            <span>09:00 - 10:30</span>
          </div>

          <h2 className="text-lg font-black leading-tight tracking-tight">
            Opening Plenary: Pathways to Impact
          </h2>

          <div className="flex items-center gap-2.5 text-xs text-slate-300 pt-1">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">
              D
            </div>
            <span>Dr. Helena Moreau · OAK Foundation</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium pt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Main Hall A</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3730a3]" />
            <span>Plenary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ca8a04]" />
            <span>Breakout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9333ea]" />
            <span>Workshop</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span>Social</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 py-1">
          <span>08:00</span>
          <div className="flex-1 h-[1px] bg-slate-200" />
          <span className="text-slate-400 font-normal">Registration & Welcome Coffee</span>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 py-1">
          <span>10:30</span>
          <div className="flex-1 h-[1px] bg-slate-200" />
          <span className="text-slate-400 font-normal">Coffee Break</span>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        <div className="space-y-3.5">
          {sessionsData.slice(0, 2).map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              isExpanded={expandedSessionId === session.id}
              onToggle={() => toggleAccordion(session.id)}
              getBadgeStyles={getBadgeStyles}
              getDotColor={getDotColor}
            />
          ))}

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 py-2">
            <span>12:00</span>
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="text-slate-400 font-normal">Networking Lunch</span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          {sessionsData.slice(2).map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              isExpanded={expandedSessionId === session.id}
              onToggle={() => toggleAccordion(session.id)}
              getBadgeStyles={getBadgeStyles}
              getDotColor={getDotColor}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function SessionCard({
  session,
  isExpanded,
  onToggle,
  getBadgeStyles,
  getDotColor,
}: {
  session: Session;
  isExpanded: boolean;
  onToggle: () => void;
  getBadgeStyles: (type: SessionType) => string;
  getDotColor: (type: SessionType) => string;
}) {
  return (
    <div
      onClick={onToggle}
      className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 flex-shrink-0 pt-0.5">
          <p className="text-sm font-extrabold text-[#0f172a]">{session.startTime}</p>
          <p className="text-[11px] font-semibold text-slate-400">-{session.endTime}</p>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-[#0f172a] text-sm leading-snug">
              {session.title}
            </h3>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold flex-shrink-0 ${getBadgeStyles(
                session.type
              )}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(session.type)}`} />
              <span>{session.type}</span>
            </div>
          </div>

          {session.speaker && (
            <p className="text-xs text-slate-500 font-medium">
              {session.speaker} · {session.organization}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{session.location}</span>
          </div>
        </div>

        <div className="text-slate-400 pt-0.5">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
}
