import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Récupère la session actuelle, ou redirige vers /login si absente.
// Réutilisable dans n'importe quelle page/layout protégé.
export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}

// Comme requireSession, mais exige EN PLUS que le rôle soit "admin".
// Si l'utilisateur est connecté mais pas admin, on le redirige (pas vers /login,
// puisqu'il EST connecté — vers une page "non autorisé" ou le dashboard normal)
export async function requireAdmin() {
  const session = await requireSession();

  if (session.user.role !== "admin") {
    redirect("/dashboard"); // ou redirect("/unauthorized") si tu crées cette page
  }

  return session;
}