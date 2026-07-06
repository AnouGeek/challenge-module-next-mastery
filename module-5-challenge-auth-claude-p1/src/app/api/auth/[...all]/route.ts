import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Transforme la config Better Auth en handlers GET/POST
// compatibles avec les Route Handlers de Next.js App Router.
// [...all] capture toutes les routes (/api/auth/sign-in, /api/auth/callback/github, etc.)
export const { GET, POST } = toNextJsHandler(auth);