import { requireParticipant } from "@/lib/auth";
import ProgrammeDocsScreen from "@/components/programme/ProgrammeDocsScreen";

export default async function ProgramDocsPage() {
  const session = await requireParticipant("/program/docs");
  return (
    <>
      <ProgrammeDocsScreen role={session.role} />
    </>
  );
}
