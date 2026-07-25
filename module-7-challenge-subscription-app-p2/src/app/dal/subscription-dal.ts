import { SubscriptionModel } from "@/db/schema/subscriptions";
import { UserModel } from "@/db/schema/users";
import { getSubscriptionsForUserService } from "@/services/subscription-service";
import { cache } from "react";

type SubscriptionDTO = {
  id: string;
  status: string;
  amount: number;
  endDate: Date;
};

function subscriptionDTO(sub: SubscriptionModel): SubscriptionDTO {
  return {
    id: sub.id,
    status: sub.status,
    amount: sub.amount,
    endDate: sub.endDate,
  };
}

export const getMySubscriptions = cache(async (currentUser: UserModel, targetUserId: string): Promise<SubscriptionDTO[] | undefined> => {
    const subscriptions = await getSubscriptionsForUserService(currentUser, targetUserId)
    return subscriptions?.map(subscriptionDTO)
})
