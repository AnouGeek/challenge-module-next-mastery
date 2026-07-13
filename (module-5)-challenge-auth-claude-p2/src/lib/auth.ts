import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Resend } from "resend";
import * as schema from "@/db/schema";
import { db } from "@/db";
import { customSession, emailOTP } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { user as userTable } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

// 1. Initialisation du service d'envoi d'e-mails (notre "facteur")
// On récupère la clé secrète depuis le fichier .env pour des raisons de sécurité.
const resend = new Resend(process.env.RESEND_API_KEY);

// 2. Configuration de la "tour de contrôle" de l'authentification
export const auth = betterAuth({
  // Branchement entre Better Auth et notre base de données via l'adaptateur Drizzle
  database: drizzleAdapter(db, {
    provider: "sqlite", // À changer en "pg" ou "postgresql" plus tard si changement de BDD
    schema: schema, // Nos plans de tables (pour que Better Auth sache où écrire)
  }),

  // Activation de la connexion par mot de passe classique
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Connecte l'utilisateur automatiquement juste après son inscription
    minPasswordLength: 8,
  },

  // Activation de la connexion via les réseaux sociaux (OAuth)
  socialProviders: {
    github: {
      // Identifiants fournis par GitHub, stockés en sécurité dans le fichier .env
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  // Ajout des super-pouvoirs (Plugins) à Better Auth
  plugins: [
    // A. Système de code de sécurité par e-mail (One-Time Password / OTP)
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Envoi concret de l'e-mail avec le service Resend
        await resend.emails.send({
          from: "Challenge Auth <onboarding@resend.dev>",
          to: email,
          subject: "Votre code de connexion",
          html: `<p>Votre code OTP est : <strong>${otp}</strong></p>
                 <p>Type de demande : ${type}</p>`,
        });
      },
      otpLength: 6,
      expiresIn: 300,
    }),

    // B. Personnalisation de la session pour y inclure le RÔLE de l'utilisateur
    customSession(async ({ user, session }) => {
      // Requête Drizzle : "Va chercher le rôle de cet utilisateur précis dans la base de données"
      const [dbUser] = await db
        .select({ role: userTable.role })
        .from(userTable)
        .where(eq(userTable.id, user.id));

      // On renvoie la session classique, mais on y greffe le rôle trouvé (ou "user" par défaut).
      // C'est vital pour pouvoir protéger nos pages/routes côté serveur selon les droits (Admin/User).
      return {
        user: {
          ...user,
          role: dbUser?.role ?? "user",
        },
        session,
      };
    }),

    // C. Indispensable pour Next.js : permet à Better Auth de lire/écrire
    // correctement les cookies du navigateur dans un environnement serveur (Server Actions/Components)
    nextCookies(),
  ],
});
