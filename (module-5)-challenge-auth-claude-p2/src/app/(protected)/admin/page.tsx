// 1. On importe uniquement notre vigile d'élite (qui contient déjà toute la logique)
import { requireAdmin } from "@/lib/auth-helpers";

// ============================================================================
// LA PAGE D'ADMINISTRATION (Zone très haute sécurité)
// ============================================================================
export default async function AdminPage() {
  // ÉTAPE 1 : Le barrage de sécurité
  // On appelle notre outil portatif.
  // - Si le visiteur n'est pas connecté -> expulsé vers /login
  // - S'il n'est pas admin -> expulsé vers /dashboard
  // - S'il est admin -> on récupère son dossier complet dans la variable "session"
  const session = await requireAdmin();

  // ÉTAPE 2 : L'affichage garanti
  // Si le code lit cette ligne, c'est qu'on a affaire à un véritable administrateur.
  // On n'a même plus besoin de vérifier si "session" existe avec un "?" !
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Panel Admin</h1>

      {/* On utilise les données de la session en toute confiance */}
      <p>Bienvenue {session.user.name}, tu as les droits admin.</p>
    </div>
  );
}
