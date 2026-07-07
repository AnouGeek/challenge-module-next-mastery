// 1. On importe l'outil d'aide à la configuration. 
// Ça sert uniquement à activer l'autocomplétion (ton éditeur va te suggérer les bons mots).
import { defineConfig } from "drizzle-kit";

// 2. L'ORDRE DE MISSION
// On exporte la configuration pour que la ligne de commande (le terminal) puisse la lire.
export default defineConfig({
  
  // 📍 "Voici où se trouvent les plans de la maison"
  // Drizzle Kit va lire ce fichier pour savoir quelles tables il doit créer ou modifier.
  schema: "./src/db/schema.ts",
  
  // 📁 "Voici où tu dois ranger tes rapports d'intervention"
  // Drizzle va créer un dossier nommé "drizzle" à la racine de ton projet 
  // et y stocker tous les fichiers SQL générés (l'historique de tes migrations).
  out: "./drizzle",
  
  // 🗣️ "Sur ce chantier, on parle ce langage"
  // Précise le type de base de données pour générer la syntaxe SQL exacte correspondante.
  // (À remplacer par "postgresql" au prochain module !)
  dialect: "sqlite",

  // 🔑 "Voici l'adresse exacte du chantier"
  // Pour que la commande "drizzle-kit push" puisse envoyer les modifications 
  // directement dans la vraie base, elle doit savoir comment s'y connecter.
  dbCredentials: {
    // Exactement la même URL que dans ton fichier db.ts
    url: "file:sqlite.db",
  },
});