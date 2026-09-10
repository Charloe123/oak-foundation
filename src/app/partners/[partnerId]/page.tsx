import type { Metadata } from "next";
import PartnerDetailsScreen from "@/components/partners/PartnerDetailsScreen";

export const metadata: Metadata = {
  title: "Partner Details | OAK Foundation Partner Gathering",
  description: "Details and contact information for an OAK Foundation Partner Convening partner.",
};

export default function PartnerDetailsPage() {
  return <PartnerDetailsScreen />;
}
