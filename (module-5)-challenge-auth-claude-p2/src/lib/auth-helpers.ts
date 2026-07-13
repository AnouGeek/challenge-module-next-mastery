// 1. Nos outils habituels : le Directeur (auth), la loupe (headers), le videur (redirect)
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// ============================================================================
// LE VIGILE STANDARD (Pour garantir qu'un utilisateur est connecté)
// ============================================================================
// On va utiliser cette fonction partout (dans nos Server Actions, nos pages...)
// C'est notre outil portatif pour ne plus jamais réécrire la logique de base.
export async function requireSession() {
  
  // ÉTAPE 1 : On fouille l'enveloppe et on interroge la base de données
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ÉTAPE 2 : Si le visiteur n'a pas de badge valide, on le jette à l'accueil
  if (!session) {
    redirect("/login");
  }

  // ÉTAPE 3 : Le détail qui tue
  // On retourne la session. Comme ça, le fichier qui a appelé ce vigile 
  // récupère instantanément toutes les infos du gars (email, id, etc.)
  return session;
}

// ============================================================================
// LE VIGILE VIP (Pour garantir que l'utilisateur est un Administrateur)
// ============================================================================
// Outil portatif pour protéger les pages critiques (comme un panel d'administration).
export async function requireAdmin() {
  
  // ÉTAPE 1 : Travail d'équipe
  // Le vigile VIP appelle d'abord le vigile standard. 
  // Si le gars n'est pas connecté du tout, requireSession() va le jeter vers /login tout seul !
  // S'il est connecté, la fonction nous ramène son dossier complet.
  const session = await requireSession();

  // ÉTAPE 2 : Le contrôle du grade
  // On lit le rôle écrit sur le dossier renvoyé par la base de données.
  // Si le rôle n'est PAS "admin", on lui refuse l'accès à la zone VIP.
  if (session.user.role !== "admin") {
    // On le redirige vers son espace normal (ou vers une page "Accès Refusé")
    redirect("/dashboard"); 
  }

  // ÉTAPE 3 : Validation
  // Si c'est bien un admin, on retourne son dossier pour que la page admin puisse l'utiliser.
  return session;
}