import {
  integer,
  pgTable,
  serial,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  employees: many(employees),
}));

export const employeesRelations = relations(employees, ({ one }) => ({
  company: one(companies, {
    fields: [employees.companyId],
    references: [companies.id],
  }),
}));
