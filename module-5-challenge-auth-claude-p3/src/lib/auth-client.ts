import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
// emailOTPClient n'existe pas tout seul dans le vide — il faut
// l'importer depuis "better-auth/client/plugins", un chemin dédié
// aux plugins côté client (différent du chemin des plugins serveur
// qu'on a utilisés dans lib/auth.ts)

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // Le client a besoin de savoir VERS QUELLE URL envoyer ses requêtes
  // HTTP (rappelle-toi le trajet qu'on vient de voir : authClient
  // fait un vrai appel réseau vers /api/auth/...).
  // On utilise NEXT_PUBLIC_APP_URL car c'est la variable accessible
  // côté navigateur (préfixe NEXT_PUBLIC_ obligatoire pour ça).
  // Le "||" fournit une valeur de secours si la variable est absente.

  plugins: [emailOTPClient()],
  // Les plugins se déclarent sous la clé "plugins" (comme côté serveur),
  // et on appelle la fonction avec () pour qu'elle s'exécute et
  // retourne la config du plugin, pas juste passer la fonction elle-même.
  // Sans ce plugin, authClient n'aurait pas les méthodes
  // authClient.emailOtp.sendVerificationOtp() / authClient.signIn.emailOtp()
});

// Raccourci d'écriture : on extrait directement les méthodes les plus
// utilisées, pour écrire "signIn.email(...)" plutôt que
// "authClient.signIn.email(...)" partout. Pure question de confort,
// authClient garde toutes ses méthodes même sans cette ligne.
export const { signIn, signUp, signOut, useSession } = authClient;