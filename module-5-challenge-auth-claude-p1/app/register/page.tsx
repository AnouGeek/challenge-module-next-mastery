"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { registerAction } from "./action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, undefined)

  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-3xl font-bold text-center">Inscription</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Input name="name" placeholder="Nom" />
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <Input name="email" type="email" placeholder="Email" />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>
        <div>
          <Input name="password" type="password" placeholder="Mot de passe" />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password[0]}</p>
          )}
        </div>
        <RegisterButton />
        {state?.message && (
          <p className="text-sm text-center text-muted-foreground">
            {state.message}
          </p>
        )}
      </form>
    </div>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Inscription..." : "S'inscrire"}
    </Button>
  )
}