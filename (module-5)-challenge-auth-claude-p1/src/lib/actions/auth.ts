"use server";

import { auth } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

// ============================================
// Type de l'état retourné par nos Server Actions
// ============================================
// useActionState a besoin d'un état "précédent" à chaque appel.
// On y stocke : les valeurs déjà tapées (pour les remettre si erreur),
// et les éventuelles erreurs de validation par champ.
export type AuthFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[]; // erreur générale (ex: "email déjà utilisé")
  };
  values?: {
    name?: string;
    email?: string;
  };
};

// ============================================
// SERVER ACTION : LOGIN
// ============================================
// Signature imposée par useActionState : (prevState, formData) => nouvel état
export async function loginAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  // 1. On extrait les données brutes du formulaire
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 2. Validation côté serveur avec Zod (jamais confiance aveugle au client)
  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    // flatten() transforme les erreurs Zod en un objet { champ: [messages] }
    // facile à afficher dans le formulaire
    return {
      errors: result.error.flatten().fieldErrors,
      values: { email: rawData.email as string },
    };
  }

  // 3. Appel à Better Auth pour tenter la connexion
  try {
    await auth.api.signInEmail({
      body: {
        email: result.data.email,
        password: result.data.password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      // error.message contient un message lisible (ex: "Invalid email or password")
      return {
        errors: { _form: [error.message] },
        values: { email: rawData.email as string },
      };
    }
    // Erreur inattendue non gérée par Better Auth
    return {
      errors: { _form: ["Une erreur est survenue. Réessaie."] },
      values: { email: rawData.email as string },
    };
  }

  // 4. Succès → redirection vers le dashboard
  // redirect() lève une exception spéciale gérée par Next.js, donc rien après cet appel
  redirect("/dashboard");
}

// ============================================
// SERVER ACTION : REGISTER
// ============================================
export async function registerAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = registerSchema.safeParse(rawData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: {
        name: rawData.name as string,
        email: rawData.email as string,
      },
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        errors: { _form: [error.message] },
        values: {
          name: rawData.name as string,
          email: rawData.email as string,
        },
      };
    }
    return {
      errors: { _form: ["Une erreur est survenue. Réessaie."] },
      values: {
        name: rawData.name as string,
        email: rawData.email as string,
      },
    };
  }

  // autoSignIn: true dans lib/auth.ts → l'utilisateur est déjà connecté après inscription
  redirect("/dashboard");
}