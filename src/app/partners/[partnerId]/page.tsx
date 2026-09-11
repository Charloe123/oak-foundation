import { requireParticipant } from "@/lib/auth";
import PartnerDetailsScreen from "@/components/partners/PartnerDetailsScreen";

export default async function PartnerDetailsPage() {
  const session = await requireParticipant("/partners");
  return (
    <>
      <PartnerDetailsScreen role={session.role} />
    </>
  );
}
