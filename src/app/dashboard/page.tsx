import { requireParticipant } from "@/lib/auth";
import DashboardScreen from "@/components/dashboard/DashboardScreen";

export default async function DashboardPage() {
  const session = await requireParticipant("/dashboard");
  return <DashboardScreen session={session} />;
}
