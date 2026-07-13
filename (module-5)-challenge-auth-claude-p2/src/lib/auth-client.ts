// 1. On importe le créateur de "télécommande" adapté à React
import { createAuthClient } from "better-auth/react";
// On importe le plugin OTP version "client" (pour le navigateur)
import { emailOTPClient } from "better-auth/client/plugins";

// 2. ON CRÉE NOTRE OUTIL CLIENT (La télécommande)
export const authClient = createAuthClient({
  // On indique l'adresse de notre serveur (notre fameux guichet d'API).
  // "NEXT_PUBLIC_" permet à Next.js de rendre cette variable lisible par le navigateur.
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // On active les mêmes super-pouvoirs que sur le serveur, mais côté interface web.
  plugins: [emailOTPClient()],
});

// 3. LA BOÎTE À OUTILS PRÊTE À L'EMPLOI
// Au lieu d'exporter tout "authClient", on extrait uniquement les fonctions et
// les hooks (useSession) dont on aura besoin dans nos composants React (boutons, formulaires...).
// Ça rendra notre code beaucoup plus propre quand on les importera ailleurs !
export const { signIn, signUp, signOut, useSession } = authClient;
