import { db } from "@/db";
import {
  AddSubscriptionModel,
  SubscriptionModel,
  subscriptions,
} from "@/db/schema/subscriptions";
import { eq } from "drizzle-orm";

export async function createSubscription(
  newSubscription: AddSubscriptionModel,
): Promise<SubscriptionModel> {
  const [created] = await db
    .insert(subscriptions)
    .values(newSubscription)
    .returning();
  return created;
}

export async function getSubscriptionById(
  id: string,
): Promise<SubscriptionModel | undefined> {
  const [found] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.id, id));
  return found;
}

export async function getSubscriptionsByUserId(
  userId: string,
): Promise<SubscriptionModel[]> {
  return await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
}
