"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthFormState } from "@/lib/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
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

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

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

          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OU</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            href="/login-otp"
            className={buttonVariants({
              variant: "ghost",
              className: "mt-2 w-full",
            })}
          >
            Se connecter par code (email)
          </Link>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
              })
            }
          >
            Continuer avec GitHub
          </Button>

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