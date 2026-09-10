import type { Metadata } from "next";
import EventCheckIn from "@/components/checkin/EventCheckIn";

export const metadata: Metadata = {
  title: "Event Check-In | OAK Foundation Partner Gathering",
  description: "Check in attendees for the OAK Foundation Partner Gathering.",
};

export default function CheckInPage() {
  return <EventCheckIn />;
}
