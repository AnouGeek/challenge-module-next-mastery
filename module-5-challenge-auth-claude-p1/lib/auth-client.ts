import { createAuthClient } from "better-auth/react"

// Client utilisable dans les composants "use client"
// Expose des hooks (useSession) et méthodes (signIn, signUp...)
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
})