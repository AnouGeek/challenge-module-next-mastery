import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

// createAuthClient crée un client typé qui sait parler à ton instance Better Auth
// côté serveur (celle définie dans lib/auth.ts), via les routes /api/auth/*
export const authClient = createAuthClient({
  // L'URL de base de ton app. Ici on la lit depuis la variable d'env
  // publique (préfixée NEXT_PUBLIC_ pour être accessible côté navigateur).
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  plugins: [
    // Pendant client du plugin emailOTP configuré côté serveur.
    // Sans ça, authClient n'aurait pas les méthodes emailOtp.sendVerificationOtp() etc.
    emailOTPClient(),
  ],
});

// On exporte directement les méthodes les plus utilisées,
// pour pouvoir écrire "signIn.email(...)" plutôt que "authClient.signIn.email(...)"
// (pur confort de syntaxe, complètement optionnel)
export const { signIn, signUp, signOut, useSession } = authClient;