import { requireParticipant } from "@/lib/auth";
import QrCodeScreen from "@/components/registration/QrCodeScreen";

export default async function QrCodePage() {
  const session = await requireParticipant("/qr-code");
  return <QrCodeScreen session={session} />;
}
