import { db } from "@/db";
import { AddUserModel, UserModel, users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function createUser(newUser: AddUserModel): Promise<UserModel> {
  const [created] = await db.insert(users).values(newUser).returning();
  return created;
}

export async function getUserById(id: string): Promise<UserModel | undefined> {
  const [found] = await db.select().from(users).where(eq(users.id, id));
  return found;
}

export async function getUserByEmail(email: string): Promise<UserModel | undefined> {
  const [found] = await db.select().from(users).where(eq(users.email, email));
  return found;
}
