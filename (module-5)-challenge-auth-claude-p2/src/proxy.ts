// On importe les outils de base de Next.js pour analyser la demande (Request) et dicter la réponse (Response)
import { NextRequest, NextResponse } from "next/server";
// On importe l'outil ultra-léger de Better Auth qui sert uniquement à fouiller dans les poches (cookies)
import { getSessionCookie } from "better-auth/cookies";

// ============================================================================
// LA BARRIÈRE DE PÉAGE (S'exécute avant même de charger la page React)
// ============================================================================
export async function proxy(request: NextRequest) {
  // ÉTAPE 1 : Fouille au corps rapide.
  // A-t-il un cookie qui s'appelle "better-auth.session_token" sur lui ?
  // (Rappel : ça ne vérifie pas si le cookie est valide, juste s'il existe).
  const sessionCookie = getSessionCookie(request);

  // ÉTAPE 2 : Où essaie-t-il d'aller ?
  const { pathname } = request.nextUrl;

  // On vérifie si la destination commence par "/dashboard" ou "/admin"
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  // ÉTAPE 3 : La décision du vigile
  // "Si tu essaies d'entrer dans la zone protégée ET que tu n'as PAS de cookie..."
  if (isProtectedRoute && !sessionCookie) {
    // "... alors je te renvoie immédiatement vers la page de connexion."
    // Le (new URL) sert à reconstruire l'adresse web complète pour la redirection.
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ÉTAPE 4 : Le feu vert
  // Si on arrive ici, c'est soit que la page n'est pas protégée,
  // soit que la page est protégée ET que le gars a un cookie.
  // On lève la barrière : "Tu peux avancer vers le Layout Guard pour la vraie vérification !"
  return NextResponse.next();
}

// ============================================================================
// LA CONFIGURATION DU RADAR (Matcher)
// ============================================================================
// On indique à Next.js les seules routes qui doivent réveiller cette fonction proxy.
// Le ":path*" veut dire "et tout ce qu'il y a derrière" (ex: /dashboard/settings, /dashboard/profile).
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
