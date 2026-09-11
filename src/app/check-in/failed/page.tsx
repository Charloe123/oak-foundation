import { requireParticipant } from "@/lib/auth";
import CheckInFailedScreen from "@/components/checkin/CheckInFailedScreen";
import RoleNavigation from "@/components/navigation/RoleNavigation";

export default async function CheckInFailedPage() {
  const session = await requireParticipant("/check-in");
  return (
    <>
      <CheckInFailedScreen />
      <RoleNavigation role={session.role} />
    </>
  );
}
