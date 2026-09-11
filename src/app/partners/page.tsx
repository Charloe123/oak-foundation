import { requireParticipant } from "@/lib/auth";
import PartnerDirectoryScreen from "@/components/partners/PartnerDirectoryScreen";

export default async function PartnersPage() {
  const session = await requireParticipant("/partners");
  return (
    <>
      <PartnerDirectoryScreen role={session.role} />
    </>
  );
}
