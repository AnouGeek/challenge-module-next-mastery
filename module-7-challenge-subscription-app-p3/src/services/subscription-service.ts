import {
  createSubscription as createSubscriptionInDb,
  getSubscriptionsByUserId,
} from "@/db/repositories/subscription-repository";
import { SubscriptionModel } from "@/db/schema/subscriptions";
import { UserModel } from "@/db/schema/users";
import { canReadSubscriptions } from "@/services/authorization/authorization-service";
import { z } from "zod";

const createSubscriptionSchema = z
  .object({
    userId: z.uuid(),
    amount: z.number().positive(),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    error: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

export async function createSubscription(
  input: unknown,
): Promise<SubscriptionModel> {
  const parsed = createSubscriptionSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(`validation a échoué ${parsed.error.message}`);
  }

  const existingSubscriptions = await getSubscriptionsByUserId(
    parsed.data.userId,
  );
  const hasActiveSubscriptions = existingSubscriptions.some(
    (sub) => sub.status === "active",
  );

  if (hasActiveSubscriptions) {
    throw new Error("vous avez deja un abonnement actif");
  }

  return createSubscriptionInDb(parsed.data);
}

export async function getSubscriptionsForUser(
  currentUser: UserModel,
  targetUserId: string,
): Promise<SubscriptionModel[]> {
  if (!canReadSubscriptions(currentUser, targetUserId)) {
    throw new Error("Accés non autorisé");
  }
  return getSubscriptionsByUserId(targetUserId);
}
