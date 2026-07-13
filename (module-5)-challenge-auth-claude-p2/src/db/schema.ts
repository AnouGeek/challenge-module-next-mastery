import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ============================================================================
// TABLE 1 : USER (L'identité de tes membres)
// ============================================================================
export const user = sqliteTable("user", {
  id: text("id").primaryKey(), // L'identifiant unique principal (généré par Better Auth)
  name: text("name").notNull(), // Le nom (obligatoire grâce au .notNull())
  
  // L'email doit être unique : impossible d'avoir deux comptes avec la même adresse
  email: text("email").notNull().unique(), 

  // SQLite ne connaît pas les booléens. Drizzle traduit l'entier (0 ou 1) en true/false.
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false), // Par défaut, l'email n'est pas vérifié à l'inscription

  image: text("image"), // L'URL de la photo de profil (facultatif)
  
  role: text("role").notNull().default("user"), // Par défaut, un inscrit est un simple "user"

  // Les dates de création et de mise à jour (traduites de entier vers Date par Drizzle)
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});


// ============================================================================
// TABLE 2 : SESSION (Les connexions actives / Le "videur" du site)
// ============================================================================
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(), // Date de fin de connexion
  
  token: text("token").notNull().unique(), // Le jeton secret stocké dans le navigateur du client
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  
  ipAddress: text("ip_address"), // L'adresse IP d'où le gars s'est connecté
  userAgent: text("user_agent"), // S'il est sur Chrome, Safari, mobile, etc.

  // LA RELATION : À qui appartient cette session ?
  userId: text("user_id")
    .notNull()
    // Si l'utilisateur est supprimé de la table "user", cette session explose avec lui (cascade)
    .references(() => user.id, { onDelete: "cascade" }), 
});


// ============================================================================
// TABLE 3 : ACCOUNT (Les méthodes pour se connecter)
// ============================================================================
// Permet de lier plusieurs méthodes de connexion (Mot de passe, GitHub, Google...) à un seul User.
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  
  providerId: text("provider_id").notNull(), // Ex: "credential" (mot de passe) ou "github"
  accountId: text("account_id").notNull(), // L'ID fourni par le fournisseur (ex: l'ID Github)

  // LA RELATION : À qui appartient ce moyen de connexion ?
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  password: text("password"), // Le mot de passe crypté (s'il s'inscrit par email classique)

  // Toutes les données techniques fournies par les réseaux sociaux (GitHub, Google, etc.)
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  idToken: text("id_token"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});


// ============================================================================
// TABLE 4 : VERIFICATION (Les jetons jetables)
// ============================================================================
// La table "poubelle" pour tout ce qui est temporaire (Code OTP par mail, lien de réinitialisation...)
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(), // Ex: l'email à qui on a envoyé le code
  value: text("value").notNull(), // Le code en lui-même (ex: "123456")
  
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(), // Date de mort du code

  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});