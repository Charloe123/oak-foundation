import type { Metadata } from "next";
import CheckInFailedScreen from "@/components/checkin/CheckInFailedScreen";

export const metadata: Metadata = {
  title: "Check-In Failed | OAK Foundation Partner Gathering",
  description: "Check-in failed because the attendee QR code could not be recognised.",
};

export default function CheckInFailedPage() {
  return <CheckInFailedScreen />;
}
