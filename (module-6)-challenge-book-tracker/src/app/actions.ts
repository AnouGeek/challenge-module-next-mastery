"use server";
// 'use server' dit à Next.js que ce fichier contient des fonctions
// exécutées côté serveur, appelables directement depuis un composant/formulaire

import { db } from "@/db";
import { books } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const CURRENT_USER_ID = 1; // simulé, pas de vraie auth pour ce projet

export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const authorId = Number(formData.get("authorId"));

  // Sécurité : validation basique avant d'insérer
  if (!title || title.trim().length === 0) {
    throw new Error("Le titre est obligatoire");
  }
  if (!authorId || isNaN(authorId)) {
    throw new Error("Author ID invalide");
  }

  await db.insert(books).values({
    title: title.trim(),
    authorId,
    userId: CURRENT_USER_ID,
  });

  revalidatePath("/test");
}

export async function toggleBookRead(bookId: number, isRead: boolean) {
  // Sécurité : on modifie SEULEMENT si ce livre appartient à CURRENT_USER_ID
  await db
    .update(books)
    .set({ isRead: !isRead })
    .where(and(eq(books.id, bookId), eq(books.userId, CURRENT_USER_ID)));

  revalidatePath("/test");
}

export async function deleteBook(bookId: number) {
  // Même principe : un user ne supprime que SES PROPRES livres
  await db
    .delete(books)
    .where(and(eq(books.id, bookId), eq(books.userId, CURRENT_USER_ID)));

  revalidatePath("/test");
}
