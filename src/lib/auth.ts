import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PARTICIPANT_COOKIE, verifyParticipantSession, type ParticipantSession } from "@/lib/session";
import { canAccessPath, getFallbackRoute, isParticipantRole, normalizePath } from "@/lib/routing";

export async function getParticipantSession(): Promise<ParticipantSession | null> {
  const cookieStore = await cookies();
  return verifyParticipantSession(cookieStore.get(PARTICIPANT_COOKIE)?.value);
}

export async function requireParticipant(pathname: string): Promise<ParticipantSession> {
  const session = await getParticipantSession();
  if (!session || !isParticipantRole(session.role)) {
    redirect("/register");
  }
  if (!canAccessPath(session.role, normalizePath(pathname))) {
    redirect(getFallbackRoute(session.role));
  }
  return session;
}
