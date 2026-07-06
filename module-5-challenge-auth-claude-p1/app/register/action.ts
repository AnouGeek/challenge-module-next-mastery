"use server"

import { auth } from "@/lib/auth"
import { RegisterFormSchema, FormState } from "@/lib/validation"

export async function registerAction(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validation Zod — identique à notre pattern du bootcamp
  const parsedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: "Champs invalides.",
    }
  }

  const { name, email, password } = parsedFields.data

  // 2. Appel à Better Auth — remplace TOUT ce qu'on codait à la main :
  // bcrypt.hash(), addUser() en BDD, createSession(), pose du cookie...
  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    })
  } catch (error) {
    return { message: "Cet email est peut-être déjà utilisé." }
  }

  return { message: "Compte créé avec succès ! Tu peux te connecter." }
}