import { z } from "zod";

// Schéma de validation pour le login
export const loginSchema = z.object({
  email: z.string().trim().min(1, "L'email est requis").email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

// Schéma de validation pour l'inscription
// Un peu plus strict que le login : on valide la solidité du mot de passe à la création
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().trim().min(1, "L'email est requis").email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// z.infer permet de dériver un type TypeScript directement depuis le schéma Zod
// → une seule source de vérité pour la forme des données, pas de duplication
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;