import { z } from "zod"

// Même pattern que dans le bootcamp : schémas Zod séparés
// pour login (email + password) et register (+ name)
export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email invalide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
})

export const RegisterFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit faire au moins 2 caractères." }),
  email: z.string().email({ message: "Email invalide." }),
  password: z.string().min(8, { message: "8 caractères minimum." }),
})

// Type de retour uniforme pour nos Server Actions
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined