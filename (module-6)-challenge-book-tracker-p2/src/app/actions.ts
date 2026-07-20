"use server"

import { db } from "@/db";
import { books } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const CURRENT_USER_ID = 1;

export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const authorId = Number(formData.get("authorId"));

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
  await db
    .update(books)
    .set({ isRead: !isRead })
    .where(and(eq(books.id, bookId), eq(books.userId, CURRENT_USER_ID)));

  revalidatePath("/test");
}

export async function deleteBook(bookId: number) {
  await db
    .delete(books)
    .where(and(eq(books.id, bookId), eq(books.userId, CURRENT_USER_ID)));
  revalidatePath("/test");
}
