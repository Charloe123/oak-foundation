import { requireParticipant } from "@/lib/auth";
import CoordinationScreen from "@/components/coordination/CoordinationScreen";

export default async function CoordinationPage() {
  const session = await requireParticipant("/coordination");
  return <CoordinationScreen session={session} />;
}
