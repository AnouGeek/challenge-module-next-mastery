import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage() {
  // On peut re-récupérer la session ici pour afficher les infos de l'utilisateur.
  // Ce n'est pas redondant avec le layout : le layout protège l'accès,
  // la page utilise les données.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Connecté en tant que : {session?.user.email}</p>
      <p>Rôle : {session?.user.role}</p>
      <LogoutButton />
    </div>
  );
}