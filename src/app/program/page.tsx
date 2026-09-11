import { requireParticipant } from "@/lib/auth";
import ProgrammeScreen from "@/components/programme/ProgrammeScreen";
import RoleNavigation from "@/components/navigation/RoleNavigation";

export default async function ProgramPage() {
  const session = await requireParticipant("/program");
  return (
    <>
      <ProgrammeScreen />
      <RoleNavigation role={session.role} />
    </>
  );
}
