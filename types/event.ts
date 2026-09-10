import type { ParticipantRole } from "@/lib/site";

export interface Participant {
  id: string;
  registration_id: string;
  qr_token: string;
  first_name: string;
  last_name: string;
  organization: string;
  role: ParticipantRole;
  sub_partner_program_area: string | null;
  consent_accepted: boolean;
  created_at: string;
}

// Sensitive fields are NEVER returned to public/unauthenticated callers.
// Only coordination/admin server code may select these.
export interface ParticipantPrivate extends Participant {
  email: string;
  phone: string;
  dietary_requirements: string | null;
  accessibility_requirements: string | null;
  travel_requirements: string | null;
  accommodation_requirements: string | null;
}

// Public-safe projection: name, organization, role, registration id only.
// QR payload contains ONLY the qr_token, never PII.
export interface ParticipantPublic {
  registration_id: string;
  first_name: string;
  last_name: string;
  organization: string;
  role: ParticipantRole;
}

export interface AttendanceRecord {
  id: string;
  participant_id: string;
  attendance_date: string;
  checked_in_at: string;
  checked_in_by: string | null;
}

export interface ProgrammeDay {
  id: string;
  event_date: string;
  title: string;
  sort_order: number;
}

export interface ProgrammeSession {
  id: string;
  day_id: string;
  start_time: string;
  end_time: string | null;
  title: string;
  venue: string | null;
  description: string | null;
  sort_order: number;
}

export interface Speaker {
  id: string;
  full_name: string;
  title: string | null;
  organization: string | null;
  bio: string | null;
  photo_url: string | null;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  overview: string | null;
  areas_of_work: string[] | null;
  website: string | null;
  logo_url: string | null;
  public_contact: string | null;
}
