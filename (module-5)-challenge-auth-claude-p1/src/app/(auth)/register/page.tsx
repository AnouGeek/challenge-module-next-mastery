"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type AuthFormState } from "@/lib/actions/auth";
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
import { authClient } from "@/lib/auth-client";

const initialState: AuthFormState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>Inscris-toi en quelques secondes</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              {state.errors?._form && (
                <p className="text-sm text-red-500">{state.errors._form[0]}</p>
              )}

              <Field data-invalid={!!state.errors?.name}>
                <FieldLabel htmlFor="name">Nom</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  defaultValue={state.values?.name}
                  disabled={pending}
                  autoComplete="name"
                />
                {state.errors?.name && (
                  <FieldError>{state.errors.name[0]}</FieldError>
                )}
              </Field>

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
                  autoComplete="new-password"
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Création..." : "Créer mon compte"}
              </Button>
            </FieldGroup>
          </form>

          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OU</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard", // où rediriger après connexion réussie
              })
            }
          >
            Continuer avec GitHub
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/login" className="underline">
              Se connecter
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
