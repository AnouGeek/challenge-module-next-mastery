import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ============================================
// TABLE: user
// ============================================
// Table principale : infos de base de chaque utilisateur.
// Better Auth lit/écrit dedans automatiquement.
export const user = sqliteTable("user", {
  id: text("id").primaryKey(), // Better Auth génère des id en string (pas d'auto-increment)

  name: text("name").notNull(),

  email: text("email").notNull().unique(), // unique() = pas deux comptes avec le même email

  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false), // SQLite n'a pas de vrai type boolean → integer + mode "boolean" (0/1 stocké, boolean manipulé)

  image: text("image"), // optionnel (ex: avatar GitHub)

  // Rôle pour le RBAC (étape 7) : "user" par défaut, "admin" pour certains comptes
  role: text("role").notNull().default("user"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// ============================================
// TABLE: session
// ============================================
// Une session = une connexion active (un appareil/navigateur donné).
// Un user peut avoir plusieurs sessions actives en même temps.
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),

  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),

  token: text("token").notNull().unique(), // stocké aussi côté client dans un cookie

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),

  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  // Clé étrangère : à quel user appartient cette session
  // onDelete: "cascade" → si le user est supprimé, ses sessions le sont aussi
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// ============================================
// TABLE: account
// ============================================
// Une "account" ≠ un user. C'est une MÉTHODE de connexion liée à un user.
// Un même user peut avoir plusieurs accounts : un pour email/password, un pour GitHub, etc.
// C'est ce qui permet le "account linking" (relier plusieurs méthodes à un seul profil).
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),

  providerId: text("provider_id").notNull(), // ex: "credential", "github"

  // L'id de l'utilisateur CHEZ le provider (ex: son id GitHub, pas notre id interne)
  accountId: text("account_id").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // Pour email/password : le hash du mot de passe est stocké ICI, pas dans "user"
  password: text("password"),

  // Pour OAuth (GitHub) : tokens
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  idToken: text("id_token"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// ============================================
// TABLE: verification
// ============================================
// Stocke temporairement les codes OTP (Resend) et tokens de vérification email.
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),

  identifier: text("identifier").notNull(), // ex: l'email de la personne

  value: text("value").notNull(), // le code OTP ou le token

  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});