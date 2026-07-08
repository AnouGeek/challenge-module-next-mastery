import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// On type explicitement la session via auth.$Infer.Session, le type
// "source de vérité" généré par Better Auth à partir de TOUTE la config
// (dont additionalFields comme "role") — plus fiable que l'inférence
// automatique dans un fichier séparé.
type Session = typeof auth.$Infer.Session;

export async function requireSession(): Promise<Session> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session as Session;
}

// requireAdmin réutilise requireSession plutôt que de dupliquer sa logique
// (principe DRY : une seule source de vérité pour "être connecté")
export async function requireAdmin(): Promise<Session> {
  const session = await requireSession();

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return session;
}