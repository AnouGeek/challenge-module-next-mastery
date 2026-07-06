import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// proxy.ts fait une vérification "optimiste" : on regarde juste si un cookie
// de session EXISTE, sans vérifier s'il est valide en base de données.
// C'est volontairement léger et rapide (pas d'appel DB ici) — juste pour
// rediriger vite les cas évidents (pas de cookie du tout = clairement pas connecté).
//
// ⚠️ Ce n'est PAS la vraie sécurité : quelqu'un pourrait forger un faux cookie
// pour passer ce contrôle. La vraie vérification se fait dans le Layout Guard
// (étape 6.2), qui lui interroge la vraie base de données.
export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Pas de cookie du tout et on essaie d'accéder à une route protégée → direction login
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Le matcher précise sur quelles routes proxy.ts doit s'exécuter
// (pas la peine de le faire tourner sur des routes publiques comme /login)
export const config = {
  runtime: "nodejs", // nécessaire pour utiliser certaines API Better Auth
  matcher: ["/dashboard/:path*"],
};