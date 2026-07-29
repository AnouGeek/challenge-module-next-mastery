import { SubscriptionModel } from "@/db/schema/subscriptions";
import { UserModel } from "@/db/schema/users";
import "server-only";
import * as authService from "@/services/authentification/auth-service";
import * as subscriptionService from "@/services/subscription-service";
import { cache } from "react";

export type SubscriptionDTO = {
  id: SubscriptionModel["id"];
  status: SubscriptionModel["status"];
  amount: SubscriptionModel["amount"];
  endDate: SubscriptionModel["endDate"];
};

function toSubscriptionDTO(sub: SubscriptionModel): SubscriptionDTO {
  return {
    id: sub.id,
    status: sub.status,
    amount: sub.amount,
    endDate: sub.endDate,
  };
}

async function requiredConnectedUser(): Promise<UserModel> {
  const currentUser = await authService.getConnectedUser();
  if (!currentUser) {
    throw new Error("Non authentifié : aucun utilisateur connecté");
  }
  return currentUser;
}

export const getUserSubscriptions = cache(
  async (targetUserId: string): Promise<SubscriptionDTO[]> => {
    const currentUser = await requiredConnectedUser();
    const subscriptions = await subscriptionService.getSubscriptionsForUser(
      currentUser,
      targetUserId,
    );

    return subscriptions.map((sub) => toSubscriptionDTO(sub));
  },
);

export async function getMySubscriptions(): Promise<SubscriptionDTO[]> {
  const currentUser = await requiredConnectedUser();
  return getUserSubscriptions(currentUser.id);
}
