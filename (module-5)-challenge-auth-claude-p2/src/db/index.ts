// 1. On importe le "cerveau" de l'ORM, spécifiquement configuré pour comprendre LibSQL (la version de SQLite qu'on utilise).
import { drizzle } from "drizzle-orm/libsql";

// 2. On importe le "tuyau" (le client) qui sait comment se connecter physiquement à la base de données.
import { createClient } from "@libsql/client";

// 3. On importe "les plans de l'architecte" (les fameuses 4 tables : user, session, etc.) 
// L'étoile (*) veut dire : "Importe TOUTES les tables qui sont exportées dans le fichier schema.ts"
import * as schema from "./schema"

// 4. LA CONNEXION PHYSIQUE
// On crée le tuyau vers la base de données.
// Ici, on lui dit de créer ou de lire un simple fichier nommé "sqlite.db" stocké localement dans le projet.
const client = createClient({
  url: "file:sqlite.db", 
});

// 5. LA MISE EN ROUTE DU MOTEUR 🚀
// On instancie Drizzle. On prend le cerveau (drizzle), on le branche au tuyau (client), 
// et on lui donne la carte complète de la maison ({ schema }).
//
// Le "export" est crucial : on met cette machine allumée à disposition de toute l'application. 
// Désormais, n'importe quel fichier Next.js pourra faire "import { db }" pour lire ou écrire des données !
export const db = drizzle(client, { schema });