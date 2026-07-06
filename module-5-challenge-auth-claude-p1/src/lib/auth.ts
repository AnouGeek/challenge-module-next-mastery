import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, customSession } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { user as userTable } from "@/db/schema";

// Client Resend pour l'envoi d'emails (OTP)
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  // --------------------------------------------
  // ADAPTER DATABASE
  // --------------------------------------------
  // On branche Drizzle comme couche de persistance.
  // provider: "sqlite" doit matcher le dialect utilisé dans drizzle.config.ts
  // schema: on lui passe notre schema.ts pour qu'il sache où lire/écrire
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),

  // Email / password (credentials)
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // connecte automatiquement après inscription
    minPasswordLength: 8,
  },

  // GitHub OAuth
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [
    // Plugin OTP par email : envoie un code à 6 chiffres via Resend
    emailOTP({
      // Appelée par Better Auth à chaque fois qu'un OTP doit être envoyé
      async sendVerificationOTP({ email, otp, type }) {
        await resend.emails.send({
          // "onboarding@resend.dev" = adresse de test Resend, sans domaine vérifié
          // (fonctionne seulement vers TON email d'inscription Resend)
          from: "Challenge Auth <onboarding@resend.dev>",
          to: email,
          subject: "Votre code de connexion",
          html: `<p>Votre code OTP est : <strong>${otp}</strong></p>
                 <p>Type de demande : ${type}</p>`,
        });
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutes
    }),

    customSession(async ({ user, session }) => {
      // On interroge nous-mêmes la table "user" pour récupérer le rôle,
      // au lieu de compter sur Better Auth pour le fournir automatiquement
      // (comportement buggé/incohérent selon les versions).
      const [dbUser] = await db
        .select({ role: userTable.role })
        .from(userTable)
        .where(eq(userTable.id, user.id));

      return {
        user: {
          ...user,
          role: dbUser?.role ?? "user", // valeur de repli si jamais rien trouvé
        },
        session,
      };
    }),

    // nextCookies DOIT être le dernier plugin de la liste.
    // Sans lui, les cookies de session ne seraient pas posés correctement
    // quand Better Auth est appelé depuis une Server Action Next.js.
    nextCookies(),
  ],
});
