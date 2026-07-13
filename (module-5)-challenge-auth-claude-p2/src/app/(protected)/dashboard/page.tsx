// 1. On importe le Directeur de la sécurité
import { auth } from "@/lib/auth";
// 2. On importe la loupe pour lire l'enveloppe HTTP
import { headers } from "next/headers";
// 3. On importe le bouton de déconnexion (qui est un composant React séparé)
import { LogoutButton } from "@/components/logout-button";

// ============================================================================
// LA PAGE SÉCURISÉE (Le contenu du coffre-fort)
// ============================================================================
// C'est un Server Component (async), donc il peut aller lire dans la base de données
// avant même d'envoyer le HTML au navigateur de l'utilisateur.
export default async function DashboardPage() {
  
  // ÉTAPE 1 : On relit le badge (la session)
  // On redemande la session à Better Auth en lui passant l'enveloppe (headers).
  // Le but ici n'est pas de bloquer l'accès (le Layout s'en est chargé), 
  // mais de récupérer les données (email, nom, rôle) pour les afficher.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ÉTAPE 2 : Le rendu visuel
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* 
        Le point d'interrogation "?" (Optional Chaining) est une sécurité de TypeScript.
        Il dit : "Si session est vide, arrête-toi là et n'essaie pas de lire .user.email 
        (ce qui ferait planter le serveur)".
      */}
      <p className="mt-2">Connecté en tant que : {session?.user.email}</p>
      
      {/* On peut aussi afficher le rôle (ex: "user" ou "admin") géré par Better Auth */}
      <p>Rôle : {session?.user.role}</p>
      
      {/* 
        On insère notre composant Client qui contient la logique pour se déconnecter.
        (Il va détruire le cookie et dire à la base de données de fermer la session).
      */}
      <LogoutButton />
    </div>
  );
}