import type { Metadata } from "next";
import ProgrammeDocsScreen from "@/components/programme/ProgrammeDocsScreen";

export const metadata: Metadata = {
  title: "Programme Docs | OAK Foundation Partner Gathering",
  description: "Session notes, photos, takeaways, and resources for the OAK Foundation Partner Convening 2026.",
};

export default function ProgrammeDocsPage() {
  return <ProgrammeDocsScreen />;
}
