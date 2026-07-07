// 1. DIRECTIVE CLIENT
// Obligatoire car on écoute une action de l'utilisateur (le clic sur le bouton)
"use client";

import { Button } from "@/components/ui/button";
// On importe la télécommande pour parler à Better Auth depuis le navigateur
import { authClient } from "@/lib/auth-client";
// On importe le système de navigation de Next.js (le GPS)
import { useRouter } from "next/navigation";

export function LogoutButton() {
  // On initialise notre GPS
  const router = useRouter();

  // 2. LA FONCTION DE DÉCONNEXION
  // Elle est "async" car on doit attendre que le serveur confirme la destruction de la session
  async function handleLogout() {
    
    // ÉTAPE 1 : La destruction du badge
    // On demande à Better Auth de supprimer le cookie local et de fermer la session dans SQLite.
    await authClient.signOut();
    
    // ÉTAPE 2 : L'expulsion
    // On redirige immédiatement l'utilisateur vers la page de connexion.
    router.push("/login");
    
    // ÉTAPE 3 : Le grand nettoyage (Crucial dans Next.js)
    // On force Next.js à oublier tout ce qu'il a gardé en mémoire (cache).
    // Ça garantit que si l'utilisateur fait "Précédent", le Layout Guard (le vigile) 
    // se réveillera, verra qu'il n'y a plus de cookie, et bloquera l'accès.
    router.refresh(); 
  }

  // 3. LE RENDU VISUEL
  return (
    <Button 
      // On branche notre fonction sur l'événement de clic
      onClick={handleLogout} 
      variant="outline" 
      className="mt-4"
    >
      Se déconnecter
    </Button>
  );
}