"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Deux étapes possibles pour cette page : d'abord demander l'email,
// puis demander le code reçu par email. On gère ça avec un simple état local
// (pas besoin de Server Action ici, cette page est 100% interactive côté client).
type Step = "email" | "otp";

export default function LoginOtpPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Étape 1 : envoyer le code OTP à l'email saisi
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in", // "sign-in" gère à la fois connexion ET création de compte si l'email n'existe pas
    });

    setPending(false);

    if (error) {
      setError(error.message ?? "Impossible d'envoyer le code.");
      return;
    }

    // Succès : on passe à l'étape 2 (saisie du code)
    setStep("otp");
  }

  // Étape 2 : vérifier le code saisi et se connecter
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    setPending(false);

    if (error) {
      setError(error.message ?? "Code invalide.");
      return;
    }

    // Connexion réussie
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connexion par code</CardTitle>
          <CardDescription>
            {step === "email"
              ? "Reçois un code de connexion par email"
              : `Code envoyé à ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          {step === "email" ? (
            <form onSubmit={handleSendOtp}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={pending}
                    required
                  />
                </Field>
                <Button type="submit" disabled={pending} className="w-full">
                  {pending ? "Envoi..." : "Envoyer le code"}
                </Button>
              </FieldGroup>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp">Code à 6 chiffres</FieldLabel>
                  <Input
                    id="otp"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={pending}
                    maxLength={6}
                    required
                  />
                </Field>
                <Button type="submit" disabled={pending} className="w-full">
                  {pending ? "Vérification..." : "Se connecter"}
                </Button>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}