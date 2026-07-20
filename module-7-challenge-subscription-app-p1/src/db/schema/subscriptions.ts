// src/db/schema/subscriptions.ts
import { pgTable, uuid, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { user } from './users'

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'cancelled',
  'pending',
])

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  status: subscriptionStatusEnum('status').notNull().default('pending'),
  amount: integer('amount').notNull(), // en centimes
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type SubscriptionModel = typeof subscriptions.$inferSelect
export type AddSubscriptionModel = typeof subscriptions.$inferInsert