import { PARTICIPANT_ROLES, type ParticipantRole } from "@/lib/site";

export const ROLE_ROUTES = {
  Partner: "/qr-code",
  "OAK Staff": "/dashboard",
  Presenter: "/dashboard",
  Observer: "/dashboard",
  "Coordination Team": "/qr-code",
} as const satisfies Record<ParticipantRole, string>;

export const ROLE_PERMISSIONS: Record<ParticipantRole, readonly string[]> = {
  Partner: ["/qr-code", "/partners", "/program"],
  "OAK Staff": ["/dashboard", "/program", "/partners"],
  Presenter: ["/dashboard", "/program", "/partners"],
  Observer: ["/dashboard", "/program", "/partners"],
  "Coordination Team": ["/coordination", "/check-in", "/attendance", "/program", "/partners"],
};

export const PUBLIC_ROUTES = new Set(["/", "/register"]);

export function getRoleRoute(role: ParticipantRole): string {
  return ROLE_ROUTES[role];
}

export function canAccessPath(role: ParticipantRole, pathname: string): boolean {
  const normalized = normalizePath(pathname);
  return ROLE_PERMISSIONS[role].some((route) => {
    if (normalized === route) return true;
    if (route === "/partners") {
      return normalized.startsWith("/partners/");
    }
    if (route === "/program") {
      return normalized.startsWith("/program/");
    }
    if (route === "/check-in") {
      return normalized.startsWith("/check-in/");
    }
    return false;
  });
}

export function getFallbackRoute(role: ParticipantRole): string {
  if (role === "Partner" || role === "Coordination Team") return "/qr-code";
  return "/dashboard";
}

export function normalizePath(pathname: string): string {
  const aliases: Record<string, string> = {
    "/programme": "/program",
    "/programme/docs": "/program/docs",
    "/checkin": "/check-in",
    "/checkin/failed": "/check-in/failed",
    "/registration-pass": "/qr-code",
  };
  const withoutTrailingSlash = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return aliases[withoutTrailingSlash] ?? withoutTrailingSlash ?? "/";
}

export function isParticipantRole(role: string | null): role is ParticipantRole {
  return PARTICIPANT_ROLES.includes(role as ParticipantRole);
}
