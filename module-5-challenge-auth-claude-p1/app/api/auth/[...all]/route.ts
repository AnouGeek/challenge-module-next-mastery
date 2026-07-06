import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

// Route catch-all : intercepte toutes les requêtes vers /api/auth/*
// (login, register, logout, callbacks OAuth...).
// Better Auth gère le routing interne, remplace nos 3 routes
// /login, /register, /logout codées à la main dans le bootcamp.
export const { POST, GET } = toNextJsHandler(auth)