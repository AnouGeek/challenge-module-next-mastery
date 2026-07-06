import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts", // où se trouve la définition des tables
  out: "./drizzle",              // où seront générés les fichiers SQL de migration

  dialect: "sqlite",

  dbCredentials: {
    url: "file:sqlite.db", // même format d'url que dans index.ts
  },
});