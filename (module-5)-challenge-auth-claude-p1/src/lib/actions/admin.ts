"use server";

import { requireAdmin } from "@/lib/auth-helpers";

export async function deleteUserAction(userId: string) {
  // Vérification systématique en tout DÉBUT de Server Action sensible.
  // Même si la page qui appelle cette action est protégée, on revérifie ici :
  // les Server Actions sont des endpoints publics, appelables depuis n'importe où.
  await requireAdmin();

  // ... logique de suppression réelle ici
}