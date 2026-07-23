import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").unique().notNull(),
  name: varchar("name").notNull(),
  password: varchar("password").notNull(),
  role: roleEnum("role").default('USER'),
  createdAt: timestamp("created_at").defaultNow(),
});
