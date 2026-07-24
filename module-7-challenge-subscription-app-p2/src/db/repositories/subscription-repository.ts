import { db } from "..";
import { eq } from "drizzle-orm";
import {
  AddSubscriptionModel,
  SubscriptionModel,
  subscriptions,
} from "../schema/subscriptions";

export async function createSubscriptionDao(
  newSubscription: AddSubscriptionModel,
): Promise<SubscriptionModel> {
  const [create] = await db
    .insert(subscriptions)
    .values(newSubscription)
    .returning();
  return create;
}

export async function getSubscriptionByIdDao(
  id: string,
): Promise<SubscriptionModel | undefined> {
  const [getById] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.id, id));
  return getById;
}

export async function getSubscriptionByUserIdDao(
  userId: string,
): Promise<SubscriptionModel[] | undefined> {
  return await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
}
