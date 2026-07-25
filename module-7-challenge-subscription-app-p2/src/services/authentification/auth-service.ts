// src/services/authentification/auth-service.ts
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import type { UserModel } from "@/db/schema/users";

export async function getConnectedUser(): Promise<UserModel | undefined> {
  const fakeConnectedUserId = "e3b4f1c7-7eb8-45d3-bc48-68a0db8dc473";

  const [connectedUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, fakeConnectedUserId));

  return connectedUser;
}
