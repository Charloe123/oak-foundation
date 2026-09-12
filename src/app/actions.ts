"use server";

import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { PARTICIPANT_COOKIE, participantCookieOptions, signParticipantSession } from "@/lib/session";
import { getRoleRoute, isParticipantRole } from "@/lib/routing";

interface RegistrationResult {
  ok: boolean;
  redirectTo?: string;
  error?: string;
}

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export async function getAttendanceStats() {
  if (!hasSupabaseConfig()) {
    console.log("Supabase not configured");
    return { expected: 0, checkedIn: 0 };
  }
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("attendance_overview", {
    p_attendance_date: "2026-11-09",
  });
  if (error) {
    console.log("Supabase error:", error.message);
    return { expected: 0, checkedIn: 0 };
  }
  if (!data || data.length === 0) {
    console.log("No data returned");
    return { expected: 0, checkedIn: 0 };
  }
  const total = data[0].total_participants ?? 0;
  const checked = data[0].checked_in ?? 0;
  console.log("Attendance overview - total:", total, "checked_in:", checked);
  return { expected: total, checkedIn: checked };
}

export async function registerParticipant(formData: FormData): Promise<RegistrationResult> {
  const firstName = value(formData, "firstName");
  const lastName = value(formData, "lastName");
  const organization = value(formData, "organization");
  const role = value(formData, "role");
  const email = value(formData, "email");
  const consent = formData.get("consent") === "yes";

  if (!firstName || !lastName || !organization || !role || !email || !consent) {
    return { ok: false, error: "Complete all required fields and accept consent." };
  }
  if (!isParticipantRole(role)) {
    return { ok: false, error: "Select a valid participant role." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (!hasSupabaseConfig()) {
    return { ok: false, error: "Supabase environment variables are not configured." };
  }
  if (!process.env.OAK_SESSION_SECRET) {
    return { ok: false, error: "Session security is not configured." };
  }

  const registrationId = `OAK-2026-${randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
  // QR code identifier is Partner-only (DB CHECK enforces NULL for other roles).
  // qr_token is still stored for all roles as the internal lookup key used by
  // the signed session cookie + future check-in lookup.
  const qrToken = randomUUID();
  const qrCodeId = role === "Partner" ? `QR-${registrationId}-${qrToken.slice(0, 8).toUpperCase()}` : null;
  const phoneValue = value(formData, "phone") || null;
  const supabase = await createClient();
  const { error } = await supabase
    .from("participants")
    .insert({
      registration_id: registrationId,
      qr_token: qrToken,
      qr_code_id: qrCodeId,
      first_name: firstName,
      last_name: lastName,
      organization,
      role,
      email,
      phone: phoneValue,
      phone_number: phoneValue,
      sub_partner_program_area: value(formData, "subPartnerProgramArea") || null,
      dietary_requirements: value(formData, "dietaryRequirements") || null,
      accessibility_requirements: value(formData, "accessibilityRequirements") || null,
      travel_requirements: value(formData, "travelAccommodation") || null,
      accommodation_requirements: null,
      registration_status: "registered",
      attendance_status: "not_attended",
      consent_accepted: true,
    });

  if (error) {
    return { ok: false, error: error.message || "Registration could not be saved." };
  }

  const session = {
    id: registrationId,
    registrationId,
    role,
    firstName,
    lastName,
    organization,
    qrToken,
  };
  const cookieStore = await cookies();
  cookieStore.set(PARTICIPANT_COOKIE, await signParticipantSession(session), participantCookieOptions());

  return { ok: true, redirectTo: getRoleRoute(role) };
}

export interface CheckInResult {
  ok: boolean;
  alreadyCheckedIn?: boolean;
  participant?: {
    registrationId: string;
    firstName: string;
    lastName: string;
    organization: string;
    role: string;
  };
  error?: string;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Coordination Team scans a participant QR (qr_token uuid) for one event day.
// Uses the SECURITY DEFINER RPC so anon callers never SELECT participants.
// Duplicate scans for the same day return alreadyCheckedIn instead of erroring.
export async function checkInParticipant(
  rawCode: string,
  attendanceDate: string
): Promise<CheckInResult> {
  const code = rawCode.trim();
  if (!UUID_RE.test(code)) {
    return { ok: false, error: "QR_NOT_RECOGNISED" };
  }
  if (!["2026-11-09", "2026-11-10", "2026-11-11"].includes(attendanceDate)) {
    return { ok: false, error: "Select a valid event day." };
  }
  if (!hasSupabaseConfig()) {
    return { ok: false, error: "Supabase environment variables are not configured." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("check_in_participant", {
    p_qr_token: code,
    p_attendance_date: attendanceDate,
  });

  if (error) {
    if (error.message.includes("QR_NOT_RECOGNISED")) {
      return { ok: false, error: "QR_NOT_RECOGNISED" };
    }
    return { ok: false, error: error.message || "Check-in could not be completed." };
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    return { ok: false, error: "QR_NOT_RECOGNISED" };
  }

  return {
    ok: true,
    alreadyCheckedIn: row.out_already_checked_in,
    participant: {
      registrationId: row.out_registration_id,
      firstName: row.out_first_name,
      lastName: row.out_last_name,
      organization: row.out_organization,
      role: row.out_role,
    },
  };
}

export async function logoutParticipant(): Promise<{ ok: true }> {
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
  }
  const cookieStore = await cookies();
  cookieStore.delete(PARTICIPANT_COOKIE);
  return { ok: true };
}
