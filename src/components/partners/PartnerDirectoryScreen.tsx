"use client";

import { useState } from "react";
import {
  Search,
  ExternalLink,
  ChevronRight,
  UserPlus,
  Calendar,
  Globe,
} from "lucide-react";

interface SubPartner {
  id: string;
  initials: string;
  name: string;
  region: string;
}

interface Partner {
  id: string;
  initials: string;
  name: string;
  region: string;
  tags: string[];
  sinceYear: string;
  website: string;
}

const subPartners: SubPartner[] = [
  { id: "1", initials: "OSF", name: "OSF", region: "Global" },
  { id: "2", initials: "ACA", name: "ACA", region: "Sub-Saharan Africa" },
  { id: "3", initials: "NEC", name: "NEC", region: "Northern Europe" },
];

const partnersData: Partner[] = [
  {
    id: "1",
    initials: "OSF",
    name: "Open Society Foundations",
    region: "Global",
    tags: ["Foundation", "Democracy", "Human Rights"],
    sinceYear: "2018",
    website: "opensocietyfoundations.org",
  },
  {
    id: "2",
    initials: "ACA",
    name: "Africa Climate Alliance",
    region: "Sub-Saharan Africa",
    tags: ["NGO", "Climate Justice", "Youth Advocacy"],
    sinceYear: "2020",
    website: "africaclimatealliance.org",
  },
  {
    id: "3",
    initials: "NEC",
    name: "Nordic Evaluation Centre",
    region: "Northern Europe",
    tags: ["Research", "Evaluation", "Learning"],
    sinceYear: "2021",
    website: "nordicevaluation.org",
  },
  {
    id: "4",
    initials: "MRG",
    name: "MENA Rights Group",
    region: "Middle East & North Africa",
    tags: ["NGO", "Human Rights", "Documentation"],
    sinceYear: "2019",
    website: "menarights.org",
  },
  {
    id: "5",
    initials: "DFI",
    name: "Digital Frontiers Institute",
    region: "Global / East Africa",
    tags: ["Research", "Digital Rights", "Internet Freedom"],
    sinceYear: "2022",
    website: "digitalfrontiers.org",
  },
  {
    id: "6",
    initials: "GAL",
    name: "Global Advocacy Lab",
    region: "Global",
    tags: ["NGO", "Communications", "Campaigns"],
    sinceYear: "2023",
    website: "globaladvocacylab.org",
  },
  {
    id: "7",
    initials: "SP",
    name: "Sciences Po Paris",
    region: "Western Europe",
    tags: ["Academic", "Research", "Policy"],
    sinceYear: "2020",
    website: "sciencespo.fr",
  },
  {
    id: "8",
    initials: "EFG",
    name: "Environmental Funders Group",
    region: "Europe",
    tags: ["Network", "Environment", "Climate"],
    sinceYear: "2017",
    website: "envfunders.eu",
  },
];

const regionFilters = [
  "All Regions",
  "Global",
  "Sub-Saharan Africa",
  "Northern Europe",
];

export default function PartnerDirectoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [activeNavTab, setActiveNavTab] = useState<
    "register" | "programme" | "partners"
  >("partners");

  const filteredPartners = partnersData.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesRegion =
      selectedRegion === "All Regions" ||
      partner.region.includes(selectedRegion);
    return matchesSearch && matchesRegion;
  });

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

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
            Partner Directory
          </h1>
        </div>

        <div className="bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search organisations, focus areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f1f5f9] border border-transparent rounded-2xl pl-10 pr-4 py-3 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 scrollbar-none">
            {regionFilters.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? "bg-[#122b52] text-white shadow-sm"
                    : "bg-[#f1f5f9] text-slate-500 hover:text-slate-800"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Sub-Partners
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {subPartners.map((sub) => (
              <div
                key={sub.id}
                className="bg-white border border-slate-100 rounded-[22px] p-4 shadow-sm flex flex-col items-center text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#122b52] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {sub.initials}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0f172a] text-xs">
                    {sub.name}
                  </h3>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                    {sub.region}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            All Partners
          </h2>

          <div className="space-y-3.5">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#122b52] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {partner.initials}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#0f172a] text-sm leading-snug">
                        {partner.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        {partner.region}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {partner.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#f1f5f9] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Partner since {partner.sinceYear}</span>
                  <a
                    href={`https://${partner.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-bold text-[#122b52] hover:underline"
                  >
                    <span>{partner.website}</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
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
