import { getUserById } from "@/db/repositories/user-repository";
import type { UserModel } from "@/db/schema/users";

export async function getConnectedUser(): Promise<UserModel | undefined> {
  const fakeConnectedUserId = "19769459-0f91-44ad-904f-cad6f1d05ffd";
  return getUserById(fakeConnectedUserId);
}
