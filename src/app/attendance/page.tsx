import { requireParticipant } from "@/lib/auth";
import { getAttendanceStats } from "@/app/actions";
import AttendanceClient from "./AttendanceClient";

export default async function AttendancePage() {
  await requireParticipant("/attendance");
  const stats = await getAttendanceStats();
  return <AttendanceClient expectedCount={stats.expected} checkedInCount={stats.checkedIn} />;
}
