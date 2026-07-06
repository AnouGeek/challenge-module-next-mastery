import { betterAuth } from "better-auth"
import Database from "better-sqlite3"

// betterAuth() centralise TOUTE la config d'authentification.
// Équivalent de notre auth.ts du bootcamp, sauf que bcrypt,
// JWT, sessions et cookies sont gérés en interne par la lib.
export const auth = betterAuth({
  // Better Auth a besoin d'une BDD pour stocker users/sessions.
  // SQLite = un simple fichier local, zéro serveur à configurer.
  database: new Database("./sqlite.db"),

  // Active l'authentification email/password
  // = l'équivalent de notre provider "Credentials" du bootcamp
  emailAndPassword: {
    enabled: true,
  },

  // Clé secrète pour signer sessions/tokens
  // = l'équivalent de notre SESSION_SECRET du module 5
  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})