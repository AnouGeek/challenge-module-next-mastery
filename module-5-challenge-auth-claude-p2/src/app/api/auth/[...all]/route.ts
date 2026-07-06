// 1. On importe "auth" : notre Directeur de la sécurité qui connaît toutes les règles (notre fichier auth.ts)
import { auth } from "@/lib/auth";

// 2. On importe le "traducteur/fabricant" fourni par Better Auth
import { toNextJsHandler } from "better-auth/next-js";

// 3. LA CRÉATION DES HANDLERS (LES EMPLOYÉS)
// toNextJsHandler(auth) fabrique automatiquement les fonctions capables 
// de comprendre les demandes du navigateur et de renvoyer les bonnes réponses.
// 
// On récupère les fonctions "GET" et "POST" fraîchement créées, et on les exporte 
// pour que Next.js puisse les utiliser quand quelqu'un tape à la porte de /api/auth/...
export const { GET, POST } = toNextJsHandler(auth);