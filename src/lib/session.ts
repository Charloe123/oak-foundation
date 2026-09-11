import type { ParticipantRole } from "@/lib/site";

export const PARTICIPANT_COOKIE = "oak_participant";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export interface ParticipantSession {
  id: string;
  registrationId: string;
  role: ParticipantRole;
  firstName: string;
  lastName: string;
  organization: string;
  qrToken: string;
}

function textEncoder() {
  return new TextEncoder();
}

function base64urlEncode(value: Uint8Array) {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64urlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getSessionKey() {
  const secret = process.env.OAK_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing OAK_SESSION_SECRET. Add it to the Vercel environment variables.");
  }
  return crypto.subtle.importKey(
    "raw",
    textEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signParticipantSession(session: ParticipantSession): Promise<string> {
  const payload = base64urlEncode(textEncoder().encode(JSON.stringify(session)));
  const key = await getSessionKey();
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder().encode(payload));
  return `${payload}.${base64urlEncode(new Uint8Array(signature))}`;
}

export async function verifyParticipantSession(value: string | undefined): Promise<ParticipantSession | null> {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  try {
    const key = await getSessionKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64urlDecode(signature),
      textEncoder().encode(payload)
    );
    if (!valid) return null;

    const parsed = JSON.parse(new TextDecoder().decode(base64urlDecode(payload))) as Partial<ParticipantSession>;
    if (!parsed.id || !parsed.registrationId || !parsed.role) return null;
    return parsed as ParticipantSession;
  } catch {
    return null;
  }
}

export function participantCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}
