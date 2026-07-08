import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "L'email est requis").email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().trim().min(1, "L'email est requis").email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// z.infer génère automatiquement le type TypeScript à partir du schéma Zod,
// pour éviter de dupliquer la même structure à deux endroits différents.
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;