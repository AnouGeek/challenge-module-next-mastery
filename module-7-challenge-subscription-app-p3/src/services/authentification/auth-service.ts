import "server-only";

import { cache } from "react";

import * as userRepository from "@/db/repositories/user-repository";
import type { UserModel } from "@/db/schema/users";

const FAKE_CONNECTED_USER_ID = "19769459-0f91-44ad-904f-cad6f1d05ffd";

export const getConnectedUser = cache(
  async (): Promise<UserModel | undefined> => {
    return userRepository.getUserById(FAKE_CONNECTED_USER_ID);
  },
);