// 1. On importe l'outil principal de la librairie Zod (souvent abrégé en "z")
import { z } from "zod";

// 2. LE SCHÉMA DE CONNEXION (Le vigile pour la porte "Login")
export const loginSchema = z.object({
  // L'email doit être une chaîne de caractères (string).
  // .trim() : Enlève automatiquement les espaces invisibles avant et après (si le gars a fait un copier-coller avec un espace en trop).
  // .min(1) : Ne doit pas être vide. Si c'est vide, on affiche "L'email est requis".
  // .email() : Zod vérifie automatiquement s'il y a bien un "@" et un ".com" ou ".fr". Sinon -> "Email invalide".
  email: z.string().trim().min(1, "L'email est requis").email("Email invalide"),
  
  // Le mot de passe est juste une chaîne qui ne doit pas être vide.
  password: z.string().min(1, "Le mot de passe est requis"),
});

// 3. LE SCHÉMA D'INSCRIPTION (Le vigile pour la porte "Register")
export const registerSchema = z.object({
  // Le nom : minimum 2 caractères (on bloque les petits malins qui s'appellent juste "A").
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  
  email: z.string().trim().min(1, "L'email est requis").email("Email invalide"),
  
  // Le mot de passe : à l'inscription, on exige au moins 8 caractères pour la sécurité.
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// 4. LA MAGIE AVEC TYPESCRIPT (Le pont entre Zod et TS)
// Zod vérifie les données quand l'application tourne (dans le navigateur).
// TypeScript, lui, a besoin de connaître les types pendant que tu codes.
// "z.infer" est un traducteur : il lit ton schéma Zod et fabrique automatiquement 
// le type TypeScript correspondant (ex: { email: string, password: string }).
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;