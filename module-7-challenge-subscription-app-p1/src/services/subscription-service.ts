// src/services/subscription-service.ts
import { z } from "zod";
import {
  createSubscriptionDao,
  getSubscriptionsByUserIdDao,
} from "@/db/repositories/subscription-repository";
import { canReadOwnSubscriptions } from "./authorization/authorization-service";
import type { UserModel } from "@/db/schema/users";

// Validation Zod : la FORME des données + relation entre les dates
const createSubscriptionSchema = z
  .object({
    userId: z.string().uuid(),
    amount: z.number().positive(),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

export async function createSubscriptionService(input: unknown) {
  // 1. Validation Zod d'abord (rapide, rejette vite le mal formé)
  const parsed = createSubscriptionSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Validation échouée : ${parsed.error.message}`);
  }

  // 2. Règle métier : pas deux abonnements "active" en même temps
  const existingSubscriptions = await getSubscriptionsByUserIdDao(
    parsed.data.userId,
  );
  const hasActiveSubscription = existingSubscriptions.some(
    (s) => s.status === "active",
  );
  if (hasActiveSubscription) {
    throw new Error("Cet utilisateur a déjà un abonnement actif");
  }

  // 3. Si tout est bon, on délègue au repository (status = 'pending' par défaut du schema)
  return createSubscriptionDao(parsed.data);
}

export async function getSubscriptionsForUserService(
  currentUser: UserModel,
  targetUserId: string,
) {
  if (!canReadOwnSubscriptions(currentUser, targetUserId)) {
    throw new Error("Accès non autorisé");
  }
  return getSubscriptionsByUserIdDao(targetUserId);
}
