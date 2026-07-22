// Version simplifiée pour ce challenge — pas de vraie librairie d'auth,
// juste une fonction qui simule "l'utilisateur connecté" pour qu'on puisse
// tester le reste de l'architecture (Repository, Service, DAL) sans configurer
// tout un système d'authentification complet.

import { db } from '@/db'
import { user } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import type { UserModel } from '@/db/schema/users'

// Pour ce challenge, on simule un utilisateur connecté en dur.
// Sur un vrai projet, cette fonction lirait un cookie de session ou un token.
export async function getConnectedUser(): Promise<UserModel | undefined> {
  // ID récupéré depuis Drizzle Studio, du user de test créé manuellement
  const fakeConnectedUserId = '9850e4fa-317e-467e-9583-42b193ace507'

  const [connectedUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, fakeConnectedUserId))

  return connectedUser
}