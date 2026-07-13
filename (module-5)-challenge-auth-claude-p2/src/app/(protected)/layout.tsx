// 1. On importe notre Directeur de la sécurité
import { auth } from "@/lib/auth";
// 2. Outil Next.js pour lire les données envoyées par le navigateur (comme les cookies cachés)
import { headers } from "next/headers";
// 3. Outil Next.js pour renvoyer les intrus à l'entrée
import { redirect } from "next/navigation";

// ============================================================================
// LE SAS DE SÉCURITÉ (Layout Guard)
// ============================================================================
// "children" représente la page cible (ex: le tableau de bord).
// Le "layout" s'enroule autour de cette page cible pour la protéger.
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // ÉTAPE 1 : La vérification biométrique en Base de Données
  // On demande à Better Auth d'extraire le cookie depuis les headers, 
  // puis de croiser cette info avec notre table "session" dans SQLite.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ÉTAPE 2 : Le couperet
  // Si session est "null" (cookie faux, expiré, ou base de données vide pour ce jeton)
  if (!session) {
    // Alarme : On renvoie l'utilisateur sans ménagement vers la page de connexion.
    // L'exécution s'arrête ici, la page secrète ne sera jamais générée.
    redirect("/login");
  }

  // ÉTAPE 3 : L'ouverture du coffre
  // Si on arrive jusqu'ici, c'est que l'identité est validée à 100%.
  // On affiche le "children", c'est-à-dire le vrai contenu de la page sécurisée.
  // Les balises <> et </> (Fragment) permettent de renvoyer le contenu proprement sans ajouter de <div> inutile.
  return <>{children}</>;
}