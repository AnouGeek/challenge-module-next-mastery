import { defineConfig } from "drizzle-kit";
// defineConfig te donne l'autocomplétion/vérification de types
// sur la config qu'on écrit juste après.

export default defineConfig({
  schema: "./src/db/schema.ts",
  // Dit à drizzle-kit où aller LIRE ta déclaration de tables

  out: "./drizzle",
  // Dit à drizzle-kit où ÉCRIRE les fichiers SQL de migration générés
  // (le dossier drizzle/ qui apparaît après pnpm db:generate)

  dialect: "sqlite",
  // Le "langage" SQL à générer — chaque DB a des variantes légères de syntaxe

  dbCredentials: {
    url: "file:sqlite.db",
    // Où drizzle-kit doit APPLIQUER les migrations générées —
    // le même fichier physique que celui pointé dans db/index.ts,
    // juste utilisé par un outil différent (drizzle-kit ici, drizzle-orm là-bas)
  },
});
