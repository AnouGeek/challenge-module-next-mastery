"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthFormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// État initial vide, avant toute soumission
const initialState: AuthFormState = {};

export default function LoginPage() {
  // useActionState relie notre Server Action à l'état du formulaire.
  // - state : le dernier AuthFormState retourné par loginAction
  // - formAction : la fonction à passer à l'attribut action="" du <form>
  // - pending : true pendant que la Server Action s'exécute (pour désactiver le bouton)
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Connecte-toi à ton compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              {/* Erreur générale (ex: mauvais mot de passe) */}
              {state.errors?._form && (
                <p className="text-sm text-red-500">{state.errors._form[0]}</p>
              )}

              <Field data-invalid={!!state.errors?.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.values?.email}
                  disabled={pending}
                  autoComplete="email"
                />
                {state.errors?.email && (
                  <FieldError>{state.errors.email[0]}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!state.errors?.password}>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  disabled={pending}
                  autoComplete="current-password"
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Connexion..." : "Se connecter"}
              </Button>
            </FieldGroup>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Pas de compte ?{" "}
            <Link href="/register" className="underline">
              S&apos;inscrire
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}