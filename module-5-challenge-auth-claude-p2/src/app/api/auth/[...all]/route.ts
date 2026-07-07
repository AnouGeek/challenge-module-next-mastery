// 1. L'IMPORT DE NOTRE LOGIQUE DE SÉCURITÉ
// On importe "auth", qui contient toutes nos règles (base de données, mots de passe, GitHub...).
// À ce stade, c'est juste un objet de configuration, il ne sait pas encore communiquer avec le web.
import { auth } from "@/lib/auth";

// 2. L'IMPORT DE L'ADAPTATEUR NEXT.JS
// Better Auth fournit des "traducteurs" pour chaque framework.
// Celui-ci sert spécifiquement à faire le pont entre Better Auth et le App Router de Next.js.
import { toNextJsHandler } from "better-auth/next-js";

// 3. LA CRÉATION DES ROUTES D'API
// On passe notre configuration "auth" dans l'adaptateur.
// L'adaptateur génère automatiquement le code nécessaire pour traiter les requêtes entrantes.
// 
// En exportant GET et POST, on indique à Next.js : 
// "Toutes les requêtes de lecture (GET) ou d'envoi de données (POST) 
// qui arrivent sur cette URL doivent être gérées par Better Auth."
export const { GET, POST } = toNextJsHandler(auth);