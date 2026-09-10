import type { Metadata } from "next";
import ProgrammeScreen from "@/components/programme/ProgrammeScreen";

export const metadata: Metadata = {
  title: "Programme | OAK Foundation Partner Gathering",
  description: "Schedule and sessions for the OAK Foundation Partner Convening 2026.",
};

export default function ProgrammePage() {
  return <ProgrammeScreen />;
}
