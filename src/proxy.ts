import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { PARTICIPANT_COOKIE, verifyParticipantSession } from "@/lib/session";
import { canAccessPath, getFallbackRoute, isParticipantRole, normalizePath, PUBLIC_ROUTES } from "@/lib/routing";

const routeAliases: Record<string, string> = {
  "/programme": "/program",
  "/programme/docs": "/program/docs",
  "/checkin": "/check-in",
  "/checkin/failed": "/check-in/failed",
  "/registration-pass": "/qr-code",
};

export async function proxy(request: NextRequest) {
  const response = await updateSession(request);
  const pathname = normalizePath(request.nextUrl.pathname);
  const alias = routeAliases[request.nextUrl.pathname.replace(/\/+$/, "") || "/"];

  if (alias && alias !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = alias;
    return NextResponse.redirect(url);
  }

  if (PUBLIC_ROUTES.has(pathname)) {
    return response;
  }

  const session = await verifyParticipantSession(request.cookies.get(PARTICIPANT_COOKIE)?.value);
  if (!session || !isParticipantRole(session.role)) {
    const url = request.nextUrl.clone();
    url.pathname = "/register";
    return NextResponse.redirect(url);
  }

  if (!canAccessPath(session.role, pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = getFallbackRoute(session.role);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
