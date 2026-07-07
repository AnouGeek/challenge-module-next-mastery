// 1. DIRECTIVE CLIENT (Obligatoire, on utilise plein de hooks React)
"use client";

// On importe useState (la mémoire locale du composant)
import { useState } from "react";
import { useRouter } from "next/navigation";
// On importe la télécommande (côté client) de Better Auth
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// On définit un "type" strict pour éviter les fautes de frappe. 
// L'étape ne peut être QUE "email" ou "otp".
type Step = "email" | "otp";

export default function LoginOtpPage() {
  const router = useRouter();

  // ============================================================================
  // LA MÉMOIRE DU COMPOSANT (Les interrupteurs)
  // ============================================================================
  const [step, setStep] = useState<Step>("email"); // Par défaut, on est à l'étape 1
  const [email, setEmail] = useState("");          // Garde en mémoire ce que le gars tape
  const [otp, setOtp] = useState("");              // Garde en mémoire le code à 6 chiffres
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);   // Le chronomètre pour bloquer les boutons

  // ============================================================================
  // ACTION 1 : ENVOYER LE CODE PAR EMAIL
  // ============================================================================
  async function handleSendOtp(e: React.FormEvent) {
    // On bloque le comportement par défaut (qui rechargerait la page entière)
    e.preventDefault(); 
    setError(null);
    setPending(true); // On allume le chronomètre

    // On utilise la télécommande pour dire au serveur d'envoyer l'email
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      // "sign-in" est très intelligent : si l'email n'existe pas dans ta BDD, 
      // Better Auth va créer le compte automatiquement !
      type: "sign-in", 
    });

    setPending(false); // On éteint le chronomètre

    if (error) {
      setError(error.message ?? "Impossible d'envoyer le code.");
      return; // On s'arrête là s'il y a un bug
    }

    // LA MAGIE : On bascule l'interrupteur. 
    // React va instantanément cacher le formulaire 1 et afficher le formulaire 2.
    setStep("otp");
  }

  // ============================================================================
  // ACTION 2 : VÉRIFIER LE CODE ET OUVRIR LA PORTE
  // ============================================================================
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    // On utilise la télécommande pour vérifier si le code tapé correspond à l'email
    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    setPending(false);

    if (error) {
      setError(error.message ?? "Code invalide.");
      return;
    }

    // SUCCÈS ! Le badge (cookie) a été créé en coulisses par Better Auth.
    // On l'envoie vers le coffre-fort et on rafraîchit la mémoire de Next.js.
    router.push("/dashboard");
    router.refresh();
  }

  // ============================================================================
  // LE RENDU VISUEL (Le Caméléon)
  // ============================================================================
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connexion par code</CardTitle>
          <CardDescription>
            {/* Si on est à l'étape 1, on affiche une phrase, sinon on affiche l'autre */}
            {step === "email"
              ? "Reçois un code de connexion par email"
              : `Code envoyé à ${email}`}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* S'il y a une erreur dans la mémoire, on l'affiche en rouge */}
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          {/* LE GROS INTERRUPTEUR : Formulaire 1 OU Formulaire 2 ? */}
          {step === "email" ? (
            
            <form onSubmit={handleSendOtp}>
              {/* FORMULAIRE 1 : DEMANDE D'EMAIL (Le commentaire est maintenant à l'intérieur du form) */}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    // On relie la case visuelle à la mémoire "email"
                    value={email}
                    // À chaque lettre tapée, on met à jour la mémoire
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
              {/* FORMULAIRE 2 : SAISIE DU CODE (Le commentaire est maintenant à l'intérieur du form) */}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp">Code à 6 chiffres</FieldLabel>
                  <Input
                    id="otp"
                    // Fait apparaître le clavier numérique sur les téléphones
                    inputMode="numeric" 
                    // Permet au téléphone de lire l'email/SMS et de suggérer le code !
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