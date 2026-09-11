import { requireParticipant } from "@/lib/auth";
import AttendanceScreen from "@/components/attendance/AttendanceScreen";

export default async function AttendancePage() {
  const session = await requireParticipant("/attendance");
  return (
    <>
      <AttendanceScreen role={session.role} />
    </>
  );
}
