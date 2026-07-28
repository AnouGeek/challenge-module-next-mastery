import "server-only";

import { cache } from "react";

import * as authService from "@/services/authentification/auth-service";
import * as subscriptionService from "@/services/subscription-service";
import type { SubscriptionModel } from "@/db/schema/subscriptions";
import type { UserModel } from "@/db/schema/users";

// ============================================
// DTO (Data Transfer Object)
// ============================================
// Liste blanche : seuls ces champs franchissent la frontière vers l'UI.
// Types dérivés du modèle Drizzle (pas réécrits à la main) pour rester
// synchronisés avec le schéma sans avoir à deviner (numeric -> string, etc.).
export type SubscriptionDTO = {
  id: SubscriptionModel["id"];
  status: SubscriptionModel["status"];
  amount: SubscriptionModel["amount"];
  endDate: SubscriptionModel["endDate"];
};

// Fonction pure : Model -> DTO. Aucun accès DB, testable isolément.
function toSubscriptionDTO(sub: SubscriptionModel): SubscriptionDTO {
  return {
    id: sub.id,
    status: sub.status,
    amount: sub.amount,
    endDate: sub.endDate,
    // Volontairement absents : userId, createdAt
  };
}

// ============================================
// Garde d'authentification
// ============================================
// getConnectedUser() renvoie UserModel | undefined.
// Ici on tranche : pas d'utilisateur = on ne va pas plus loin.
// Le type de retour est UserModel (sans undefined), donc tout ce qui
// suit l'appel est débarrassé de l'ambiguïté.
async function requireConnectedUser(): Promise<UserModel> {
  const currentUser = await authService.getConnectedUser();

  if (!currentUser) {
    throw new Error("Unauthorized: no connected user");
  }

  return currentUser;
}

// ============================================
// Lecture principale
// ============================================
export const getUserSubscriptions = cache(
  async (targetUserId: string): Promise<SubscriptionDTO[]> => {
    const currentUser = await requireConnectedUser();

    // Le service porte la décision d'autorisation (isAdminOrOwner).
    const subscriptions = await subscriptionService.getSubscriptionsForUser(
      currentUser,
      targetUserId,
    );

    return subscriptions.map((sub) => toSubscriptionDTO(sub));
  },
);

// Raccourci pour le cas courant « mes abonnements ».
export async function getMySubscriptions(): Promise<SubscriptionDTO[]> {
  const currentUser = await requireConnectedUser();
  return getUserSubscriptions(currentUser.id);
}