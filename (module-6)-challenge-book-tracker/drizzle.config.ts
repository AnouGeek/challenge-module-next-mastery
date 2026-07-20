// dotenv charge les variables de ton fichier .env (POSTGRES_URL_LOCAL)
// pour qu'elles soient accessibles via process.env
import "dotenv/config";

// defineConfig est une fonction fournie par Drizzle Kit
// pour créer un fichier de config typé et validé
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // 'out' : dossier où Drizzle Kit va générer les fichiers de migration
  // (fichiers SQL qui tracent l'historique des changements de ta base)
  out: "./drizzle",

  // 'schema' : chemin vers ton fichier de modélisation des tables
  // (celui qu'on va créer juste après)
  schema: "./src/db/schema.ts",

  // 'dialect' : précise à Drizzle Kit quel langage SQL utiliser
  // ici PostgreSQL (différent de MySQL ou SQLite)
  dialect: "postgresql",

  // 'dbCredentials' : les infos de connexion vers ta vraie base
  dbCredentials: {
    // le '!' dit à TypeScript "je suis sûr que cette variable existe"
    // (sinon TS pourrait se plaindre qu'elle pourrait être undefined)
    url: process.env.POSTGRES_URL_LOCAL!,
  },
});
