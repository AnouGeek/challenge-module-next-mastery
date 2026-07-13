import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// createClient ouvre une connexion à la base de données.
// "file:sqlite.db" = un fichier SQLite local nommé sqlite.db à la racine du projet
const client = createClient({
  url: "file:sqlite.db",
});

// On enveloppe le client avec Drizzle pour avoir l'API Drizzle (db.select(), db.insert()...)
// au lieu d'écrire du SQL brut. Le schema passé donne l'autocomplétion TypeScript.
export const db = drizzle(client, { schema });