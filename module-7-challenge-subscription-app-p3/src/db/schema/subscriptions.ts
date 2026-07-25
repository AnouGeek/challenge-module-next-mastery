import { integer, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "cancelled",
  "pending",
]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  status: subscriptionStatusEnum("status").notNull().default("pending"),
  amount: integer("amount").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SubscriptionModel = typeof subscriptions.$inferSelect;
export type AddSubscriptionModel = typeof subscriptions.$inferInsert;
