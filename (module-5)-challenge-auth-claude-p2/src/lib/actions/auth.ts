// 1. LA DIRECTIVE NEXT.JS
// Indique que tout ce code tourne côté serveur. Sécurité maximale.
"use server";

import { auth } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

// 2. LE FORMAT DE LA RÉPONSE (Ce que le serveur va renvoyer au composant React)
export type AuthFormState = {
  // Les erreurs potentielles (par champ, ou globale dans "_form")
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[]; // Utilisé pour les erreurs générales (ex: "Mauvais mot de passe")
  };
  // Les valeurs saisies (pour ne pas vider le formulaire en cas d'erreur)
  values?: {
    name?: string;
    email?: string;
  };
};


// ============================================================================
// L'ACTION DE CONNEXION (LOGIN)
// ============================================================================
// prevState : l'état précédent du formulaire (requis par React)
// formData : les données brutes envoyées par le clic sur le bouton "Submit"
export async function loginAction(
  prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  
  // ÉTAPE 1 : On extrait les données brutes du formulaire
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // ÉTAPE 2 : On fait passer les données brutes au vigile Zod
  // "safeParse" est génial car il ne fait pas planter l'application s'il y a une erreur.
  // Il renvoie juste un objet avec success: true ou success: false.
  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    // Si Zod n'est pas content (ex: email mal formaté), on s'arrête là.
    // On renvoie les erreurs formatées (.flatten) et on redonne l'email saisi pour l'UX.
    return {
      errors: result.error.flatten().fieldErrors,
      values: { email: rawData.email as string },
    };
  }

  // ÉTAPE 3 : On tente la vraie connexion avec Better Auth
  try {
    // On demande à notre Directeur de la sécurité d'essayer de connecter le gars
    await auth.api.signInEmail({
      body: {
        email: result.data.email,
        password: result.data.password,
      },
    });
  } catch (error) {
    // Si la connexion échoue (ex: faux mot de passe, compte inexistant)
    if (error instanceof APIError) {
      // Si l'erreur vient spécifiquement de Better Auth, on renvoie son message précis
      return {
        errors: { _form: [error.message] },
        values: { email: rawData.email as string },
      };
    }
    // Si c'est un autre bug (ex: base de données plantée), on renvoie un message générique
    return {
      errors: { _form: ["Une erreur est survenue. Réessaie."] },
      values: { email: rawData.email as string },
    };
  }

  // ÉTAPE 4 : Le succès !
  // Si on arrive jusqu'ici, c'est que Zod a dit OUI, et Better Auth a dit OUI.
  // On envoie le client vers la page protégée.
  redirect("/dashboard");
}


// ============================================================================
// L'ACTION D'INSCRIPTION (REGISTER)
// ============================================================================
// La logique est exactement la même que pour le Login, avec le champ "name" en plus !
export async function registerAction(
  prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  
  // ÉTAPE 1 : Extraction
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // ÉTAPE 2 : Vérification Zod
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

  // ÉTAPE 3 : Création du compte dans la BDD via Better Auth
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

  // ÉTAPE 4 : Succès et redirection (autoSignIn gérera la connexion automatique)
  redirect("/dashboard");
}