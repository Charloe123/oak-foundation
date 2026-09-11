import { requireParticipant } from "@/lib/auth";
import EventCheckIn from "@/components/checkin/EventCheckIn";
import RoleNavigation from "@/components/navigation/RoleNavigation";

export default async function CheckInPage() {
  const session = await requireParticipant("/check-in");
  return (
    <>
      <EventCheckIn />
      <RoleNavigation role={session.role} />
    </>
  );
}
