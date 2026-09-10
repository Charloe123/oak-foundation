// Shared OAK Foundation event configuration.
// Single source of truth for dates, venue, and roles.
export const EVENT = {
  name: "OAK Zimbabwe Foundation Partner Gathering",
  venue: "Cresta Lodge, Msasa, Harare, Zimbabwe",
  dates: ["2026-11-09", "2026-11-10", "2026-11-11"] as const,
  dateLabels: ["9 November 2026", "10 November 2026", "11 November 2026"] as const,
  dayLabels: ["Day 1 - 9 November", "Day 2 - 10 November", "Day 3 - 11 November"] as const,
  expectedAttendance: 110,
} as const;

export const PARTICIPANT_ROLES = [
  "Partner",
  "OAK Staff",
  "Coordination Team",
  "Presenter",
  "Observer",
] as const;

export type ParticipantRole = (typeof PARTICIPANT_ROLES)[number];

export type EventDate = (typeof EVENT.dates)[number];
