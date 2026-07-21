// src/db/repositories/user-repository.ts
import { db } from '@/db'
import { user } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import type { UserModel, AddUserModel } from '@/db/schema/users'

// Convention de nommage du module : suffixe "Dao" pour la persistence
export async function createUserDao(newUser: AddUserModel): Promise<UserModel> {
  const [created] = await db.insert(user).values(newUser).returning()
  return created
}

export async function getUserByIdDao(id: string): Promise<UserModel | undefined> {
  const [found] = await db.select().from(user).where(eq(user.id, id))
  return found
}

export async function getUserByEmailDao(email: string): Promise<UserModel | undefined> {
  const [found] = await db.select().from(user).where(eq(user.email, email))
  return found
}