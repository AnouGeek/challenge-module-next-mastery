import { drizzle } from "drizzle-orm/libsql";
// La fonction drizzle() vient spécifiquement de "drizzle-orm/libsql"
// (et non juste "drizzle-orm") parce que Drizzle a une version différente
// de cette fonction selon le driver de base de données utilisé —
// ici on utilise libsql, donc on importe la version adaptée à libsql.

import { createClient } from "@libsql/client";
// @libsql/client est le "driver" : la librairie technique de bas niveau
// qui sait littéralement ouvrir/parler à un fichier SQLite via le protocole libsql.

import * as schema from "./schema";
// On récupère TOUT ce qu'exporte schema.ts (user, session, account, verification)
// regroupé dans un seul objet nommé "schema".

const client = createClient({
  url: "file:sqlite.db",
  // On ouvre la connexion : "file:sqlite.db" dit "connecte-toi à un fichier
  // SQLite local nommé sqlite.db, à la racine du projet".
  // "client" représente cette connexion active, brute — sans encore
  // les fonctionnalités pratiques de Drizzle par-dessus.
});

export const db = drizzle(client, { schema });
// On enveloppe ce "client" brut avec drizzle(), en lui passant aussi le schema.
// Résultat : l'objet "db" qu'on exporte sait maintenant faire des requêtes
// typées (db.select().from(user)...) avec autocomplétion TypeScript complète,
// grâce au schema qu'on lui a donné.
// C'est CET objet "db" qu'on va réutiliser dans TOUT le reste du projet
// dès qu'on a besoin de lire/écrire des données.