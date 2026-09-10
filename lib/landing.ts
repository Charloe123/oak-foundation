// UI copy on this screen follows the Figma landing page exactly.
// Event dates/venue/roles remain governed by lib/site.ts + requirements;
// only the Figma wording discrepancy is flagged, not silently changed.
export const LANDING_COPY = {
  eyebrow: "PARTNER CONVENING 2026",
  titleA: "Partner",
  titleB: "Convening 2026",
  // Figma shows "Geneva - 9-11 March 2026" but requirements specify
  // Cresta Lodge Msasa Harare, 9-11 November 2026. Surface both:
  // Figma string preserved for visual QA, correct string used in UI.
  figmaSubtitle: "Geneva - 9-11 March 2026",
  stats: [
    { value: "110+", label: "Attendees" },
    { value: "24", label: "Sessions" },
    { value: "38", label: "Partners" },
  ],
} as const;
