// src/db/repositories/subscription-repository.ts
import { db } from '@/db'
import { subscriptions } from '@/db/schema/subscriptions' 
import { eq } from 'drizzle-orm'
import type { SubscriptionModel, AddSubscriptionModel } from '@/db/schema/subscriptions'

// Une seule subscription créée → nom au singulier
export async function createSubscriptionDao(
  newSubscription: AddSubscriptionModel
): Promise<SubscriptionModel> {
  const [created] = await db.insert(subscriptions).values(newSubscription).returning()
  return created
}

// Recherche par UN id précis → un seul résultat possible → singulier
export async function getSubscriptionByIdDao(
  id: string
): Promise<SubscriptionModel | undefined> {
  const [found] = await db.select().from(subscriptions).where(eq(subscriptions.id, id))
  return found
}

// Un user peut avoir PLUSIEURS abonnements (historique) → pluriel + tableau complet, pas [found]
export async function getSubscriptionsByUserIdDao(
  userId: string
): Promise<SubscriptionModel[]> {
  return db.select().from(subscriptions).where(eq(subscriptions.userId, userId))
}