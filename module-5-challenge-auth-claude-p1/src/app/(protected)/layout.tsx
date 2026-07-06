import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Ce layout englobe toutes les pages du groupe (protected), dont /dashboard.
// Contrairement à proxy.ts, ici on fait une VRAIE vérification :
// auth.api.getSession() interroge la base de données pour confirmer
// que la session existe vraiment et n'a pas expiré.
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si pas de session valide en DB, on renvoie vers le login
  // (même si le cookie existait, proxy.ts ne suffisait pas à garantir la validité)
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}