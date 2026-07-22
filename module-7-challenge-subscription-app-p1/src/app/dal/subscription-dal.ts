import { cache } from "react";
import { getSubscriptionsForUserService } from "@/services/subscription-service";
import type { SubscriptionModel } from "@/db/schema/subscriptions";
import type { UserModel } from "@/db/schema/users";

// ============================================
// DTO (Data Transfer Object)
// ============================================
// Ce type décrit CE QUE LA VUE A LE DROIT DE VOIR.
// Il est volontairement plus restreint que SubscriptionModel (le type complet venant de Drizzle).
// On liste ici SEULEMENT les champs autorisés — si demain on ajoute un champ sensible
// dans la table (ex: un identifiant de paiement interne), il n'apparaîtra JAMAIS ici
// tant qu'on ne l'ajoute pas explicitement à cette liste.
export type SubscriptionDTO = {
  id: string;
  status: string;
  amount: number;
  endDate: Date;
};

// ============================================
// Fonction de transformation Model -> DTO
// ============================================
// Elle prend UN abonnement complet (SubscriptionModel, tel que Drizzle le retourne,
// avec TOUS les champs de la table : userId, createdAt, etc.)
// et retourne un NOUVEL objet, plus petit, qui correspond au type SubscriptionDTO.
// TypeScript vérifie que cet objet retourné respecte bien la forme de SubscriptionDTO.
function subscriptionDTO(sub: SubscriptionModel): SubscriptionDTO {
  return {
    id: sub.id,
    status: sub.status,
    amount: sub.amount,
    endDate: sub.endDate,
    // Volontairement absent : sub.userId, sub.createdAt
    // -> la vue n'a pas besoin de les connaître, donc on ne les expose pas
  };
}

// ============================================
// Fonction principale du DAL
// ============================================
// cache() de React : si plusieurs composants de la même page appellent
// getMySubscriptions avec les mêmes paramètres pendant un même rendu,
// React ne va exécuter la fonction qu'UNE SEULE FOIS, et réutilise le résultat.
// Évite de refaire la même requête DB plusieurs fois inutilement.
export const getMySubscriptions = cache(
  async (
    currentUser: UserModel, // l'utilisateur connecté (celui qui fait la demande)
    targetUserId: string, // l'utilisateur dont on veut voir les abonnements
  ): Promise<SubscriptionDTO[]> => {
    // 1. On appelle le SERVICE (pas le repository directement !).
    //    C'est le Service qui vérifie l'autorisation (canReadOwnSubscriptions)
    //    et qui va chercher les données brutes (SubscriptionModel[]) via le repository.
    const subscriptions = await getSubscriptionsForUserService(
      currentUser,
      targetUserId,
    );

    // 2. On transforme CHAQUE abonnement brut en DTO avant de le renvoyer.
    //    .map() applique subscriptionDTO() à chaque élément du tableau
    //    et retourne un nouveau tableau de DTO (jamais les Model bruts).
    return subscriptions.map(subscriptionDTO);
  },
);
