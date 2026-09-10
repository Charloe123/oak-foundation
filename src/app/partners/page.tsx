import type { Metadata } from "next";
import PartnerDirectoryScreen from "@/components/partners/PartnerDirectoryScreen";

export const metadata: Metadata = {
  title: "Partner Directory | OAK Foundation Partner Gathering",
  description: "Browse partners and sub-partners attending the OAK Foundation Partner Convening 2026.",
};

export default function PartnersPage() {
  return <PartnerDirectoryScreen />;
}
