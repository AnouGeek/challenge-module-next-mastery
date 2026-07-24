import { db } from "..";
import { eq } from "drizzle-orm";
import { AddUserModel, UserModel, users } from "../schema/users";

export async function createUserDao(newUser: AddUserModel): Promise<UserModel> {
  const [created] = await db.insert(users).values(newUser).returning();
  return created;
}

export async function getUserByIdDao(id: string): Promise<UserModel | undefined> {
  const [found] = await db.select().from(users).where(eq(users.id, id));
  return found;
}

export async function getUserByEmailDao(email: string): Promise<UserModel | undefined> {
  const [foundByEmail] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return foundByEmail;
}
