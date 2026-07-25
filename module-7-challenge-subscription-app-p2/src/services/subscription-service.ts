import {
  createSubscriptionDao,
  getSubscriptionByUserIdDao,
} from "@/db/repositories/subscription-repository";
import * as z from "zod";
import { canReadOwnSubscriptions } from "./authorization/authorization-service";
import { UserModel } from "@/db/schema/users";

const createSubscriptionSchema = z
  .object({
    userId: z.uuid(),
    amount: z.number().positive(),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

export async function createSubscriptionService(input: unknown) {
  const parsed = createSubscriptionSchema.safeParse(input);
  console.log(parsed);

  if (!parsed.success) {
    throw new Error("souscription invalide");
  }
  const existingSubcriptions = await getSubscriptionByUserIdDao(
    parsed.data.userId,
  );

  const hasActiveSubscription = existingSubcriptions?.some(
    (sub) => sub.status === "active",
  );

  if (hasActiveSubscription) {
    throw new Error("dejà un abonnement actif");
  }
  return createSubscriptionDao(parsed.data);
}

export async function getSubscriptionsForUserService(currentUser: UserModel, targetUserId: string) {
  const isAuthorized = canReadOwnSubscriptions(currentUser, targetUserId)

  if(!isAuthorized) {
    throw new Error ("Accés non autorisé")
  }
  return getSubscriptionByUserIdDao(targetUserId)
}
