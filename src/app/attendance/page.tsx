import type { Metadata } from "next";
import AttendanceScreen from "@/components/attendance/AttendanceScreen";

export const metadata: Metadata = {
  title: "Attendance | OAK Foundation Partner Gathering",
  description: "Track attendee check-ins for the OAK Foundation Partner Convening 2026.",
};

export default function AttendancePage() {
  return <AttendanceScreen />;
}
