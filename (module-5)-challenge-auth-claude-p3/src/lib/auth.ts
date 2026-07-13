import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, customSession } from "better-auth/plugins";
import { Resend } from "resend";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { user as userTable } from "@/db/schema";

// Client Resend pour l'envoi d'emails (OTP)
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  // Adapter database : traducteur entre Better Auth et Drizzle.
  // schema donne à l'adapter la structure exacte de tes tables.
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),

  // Déclare les colonnes custom qu'on a ajoutées à "user" (au-delà
  // des colonnes standard connues nativement par Better Auth).
  // Sans ce bloc, "role" resterait invisible pour toute la logique
  // interne de Better Auth (même si la colonne existe bien en DB).
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
        // input: false empêche un utilisateur de s'auto-attribuer
        // le rôle admin via un formulaire d'inscription détourné
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // connecte automatiquement après inscription
    minPasswordLength: 8,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [
    // Plugin OTP par email : envoie un code à 6 chiffres via Resend
    emailOTP({
      // Appelée automatiquement par Better Auth à chaque fois
      // qu'un OTP doit être envoyé
      async sendVerificationOTP({ email, otp, type }) {
        await resend.emails.send({
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

    // Contourne le bug : on va chercher le rôle NOUS-MÊMES en DB,
    // plutôt que de faire confiance à user.role (potentiellement
    // absent à cause d'un comportement incohérent de Better Auth).
    customSession(async ({ user, session }) => {
      const [dbUser] = await db
        .select({ role: userTable.role })
        .from(userTable)
        .where(eq(userTable.id, user.id));

      return {
        user: {
          ...user,
          role: dbUser?.role ?? "user", // valeur de repli si rien trouvé
        },
        session,
      };
    }),

    // nextCookies DOIT être en dernier : il intercepte le résultat FINAL
    // (après tous les autres plugins) pour poser correctement le cookie
    // de session via le mécanisme spécifique aux Server Actions Next.js.
    nextCookies(),
  ],
});