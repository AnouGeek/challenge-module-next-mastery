"use server";

import { auth } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

// État partagé entre les Server Actions et useActionState côté client.
// errors : messages d'erreur par champ (tableau car un champ peut avoir plusieurs erreurs)
// values : pour re-remplir les champs après une erreur (jamais le password, question de sécurité)
export type AuthFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[]; // erreur générale, pas liée à un champ précis
  };
  values?: {
    name?: string;
    email?: string;
  };
};

// La signature (prevState, formData) => Promise<AuthFormState> est imposée
// par useActionState côté client — c'est lui qui appelle cette fonction avec
// exactement ces deux paramètres, dans cet ordre.
export async function loginAction(
  prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // safeParse ne plante jamais (contrairement à parse) — retourne toujours
  // { success: true/false }, adapté pour gérer une erreur de saisie comme un cas normal.
  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: { email: rawData.email as string },
    };
  }

  try {
    // auth.api.signInEmail : appel direct côté serveur (pas de HTTP),
    // contrairement à authClient qui, lui, passerait par la route API.
    await auth.api.signInEmail({
      body: {
        email: result.data.email,
        password: result.data.password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        errors: { _form: [error.message] },
        values: { email: rawData.email as string },
      };
    }
    return {
      errors: { _form: ["Une erreur est survenue. Réessaie."] },
      values: { email: rawData.email as string },
    };
  }

  // redirect() est placé APRÈS le try/catch, jamais dedans :
  // il lève une exception spéciale en interne, que le catch juste au-dessus
  // intercepterait par erreur s'il était à l'intérieur du try.
  redirect("/dashboard");
}

export async function registerAction(
  prevState: AuthFormState,
  formData: FormData,
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