import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Vérification "optimiste" : on regarde juste si un cookie de session EXISTE,
// sans vérifier s'il est valide en base de données (pas d'appel DB ici,
// volontairement léger et rapide).
// Ce n'est PAS la vraie sécurité : la vraie vérification se fait dans le
// Layout Guard, qui lui interroge la vraie base de données.
export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const { pathname } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};