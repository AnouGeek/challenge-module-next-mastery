import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  // text, pas integer : Better Auth génère des id en string (type UUID/nanoid),
  // pas des nombres auto-incrémentés

  name: text("name").notNull(),

  email: text("email").notNull().unique(),
  // .unique() : empêche deux comptes avec le même email

  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  // SQLite n'a pas de vrai type boolean → on utilise integer avec mode "boolean"
  // (stocké comme 0/1, mais manipulé comme true/false dans le code)

  image: text("image"),
  // optionnel (pas de .notNull()) : photo de profil, ex. avatar GitHub

  role: text("role").notNull().default("user"),
  // colonne custom qu'ON ajoute (pas standard Better Auth) pour le RBAC

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  // dates de création/modification, quasi systématiques sur toute table
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),

  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  // une session a une date d'expiration, contrairement au compte user lui-même

  token: text("token").notNull().unique(),
  // le token stocké aussi côté client dans un cookie, sert à identifier la session

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),

  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  // infos optionnelles sur l'appareil/navigateur qui a créé cette session

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // clé étrangère : à quel user appartient cette session
  // cascade : si le user est supprimé, ses sessions le sont aussi automatiquement
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),

  providerId: text("provider_id").notNull(),
  // ex: "credential" (email/password), "github"...

  accountId: text("account_id").notNull(),
  // l'id de l'utilisateur CHEZ le provider (ex: son id GitHub),
  // pas notre id interne

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  password: text("password"),
  // pour email/password : le hash du mot de passe est stocké ICI, pas dans "user"

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  idToken: text("id_token"),
  // ces colonnes servent pour OAuth (GitHub) : tokens d'accès

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),

  identifier: text("identifier").notNull(),
  // ex: l'email de la personne — PAS de userId ici volontairement,
  // rappelle-toi pourquoi (un OTP peut être demandé avant même
  // qu'un compte soit finalisé)

  value: text("value").notNull(),
  // le code OTP ou le token

  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});
