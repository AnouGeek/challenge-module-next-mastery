// 1. DIRECTIVE CLIENT
// Obligatoire dès qu'on a des interactions utilisateur (clics, saisie de texte) ou des hooks d'état.
"use client";

import { useActionState } from "react";
import Link from "next/link";
// Le changement principal : on importe l'action d'inscription !
import { registerAction, type AuthFormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// La télécommande pour GitHub
import { authClient } from "@/lib/auth-client";

// L'état de départ du formulaire (vide)
const initialState: AuthFormState = {};

export default function RegisterPage() {
  
  // 2. LE PONT SUSPENDU
  // state : Les retours du serveur (ex: "Cet email est déjà utilisé").
  // formAction : Le déclencheur qui va prendre les données et les envoyer au serveur.
  // pending : Le chronomètre (true = le serveur travaille, false = il a fini).
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
          
          {/* 3. LE FORMULAIRE */}
          {/* On branche l'envoi des données sur l'action de notre pont */}
          <form action={formAction}>
            <FieldGroup>
              
              {/* Erreur globale du serveur (ex: Base de données hors ligne) */}
              {state.errors?._form && (
                <p className="text-sm text-red-500">{state.errors._form[0]}</p>
              )}

              {/* NOUVEAU CHAMP : LE NOM */}
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

              {/* CHAMP EMAIL (Identique au Login) */}
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

              {/* CHAMP MOT DE PASSE */}
              <Field data-invalid={!!state.errors?.password}>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  disabled={pending}
                //   {/* autoComplete="new-password" dit au navigateur : "C'est une création, propose un mot de passe fort !" */}
                  autoComplete="new-password" 
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              {/* BOUTON DE VALIDATION */}
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Création..." : "Créer mon compte"}
              </Button>
            </FieldGroup>
          </form>

          {/* SÉPARATEUR VISUEL */}
          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OU</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 4. BOUTON D'INSCRIPTION GITHUB */}
          {/* C'est la même fonction signIn.social que pour la connexion. */}
          {/* Better Auth est intelligent : s'il ne connaît pas l'utilisateur GitHub, il va créer le compte automatiquement ! */}
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