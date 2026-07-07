// 1. DIRECTIVE CLIENT
// Indique que ce composant s'affiche dans le navigateur (nécessaire car on a des boutons et des états).
"use client";

import { useActionState } from "react";
import Link from "next/link";
// On importe notre Server Action (le pont vers le serveur) et le type de notre état
import { loginAction, type AuthFormState } from "@/lib/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// On importe la "télécommande" pour le bouton GitHub
import { authClient } from "@/lib/auth-client";

// L'état de départ avant que l'utilisateur ne fasse quoi que ce soit (tout est vide)
const initialState: AuthFormState = {};

export default function LoginPage() {
  
  // 2. LE PONT SUSPENDU (useActionState)
  // state = Ce que le serveur nous répond (les erreurs Zod, les valeurs gardées en mémoire)
  // formAction = La fonction à attacher à notre formulaire pour envoyer les données
  // pending = Un booléen (true/false) qui nous dit si le serveur est en train de chercher
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
          
          {/* 3. LE FORMULAIRE CLASSIQUE */}
          {/* On branche le câble "formAction" ici. */}
          <form action={formAction}>
            <FieldGroup>
              
              {/* Affichage d'une erreur globale (ex: "Mot de passe incorrect" renvoyé par Better Auth) */}
              {state.errors?._form && (
                <p className="text-sm text-red-500">{state.errors._form[0]}</p>
              )}

              {/* CHAMP EMAIL */}
              {/* "!!" transforme la présence d'une erreur en strict true ou false pour activer le style rouge */}
              <Field data-invalid={!!state.errors?.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                
                {/* UX : defaultValue remet l'email tapé pour ne pas frustrer l'utilisateur */}
                {/* UX : disabled={pending} bloque l'input pendant que le serveur travaille */}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.values?.email} 
                  disabled={pending} 
                  autoComplete="email"
                />
                
                {/* Si Zod a renvoyé une erreur sur l'email, on l'affiche en dessous */}
                {state.errors?.email && (
                  <FieldError>{state.errors.email[0]}</FieldError>
                )}
              </Field>

              {/* CHAMP MOT DE PASSE (Même logique que l'email) */}
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

              {/* BOUTON DE VALIDATION */}
              {/* On le bloque (disabled) si ça charge, et on change le texte pour faire patienter */}
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Connexion..." : "Se connecter"}
              </Button>
            </FieldGroup>
          </form>

          {/* ... Séparateur visuel ... */}
          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OU</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 4. LES AUTRES MÉTHODES DE CONNEXION */}
          
          <Link href="/login-otp" className={buttonVariants({ variant: "ghost", className: "mt-2 w-full" })}>
            Se connecter par code (email)
          </Link>

          {/* BOUTON GITHUB */}
          {/* Ici, pas de Server Action. On utilise directement notre télécommande côté client */}
          {/* Better Auth va rediriger l'utilisateur vers GitHub, puis le ramener sur "/dashboard" */}
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