"use server";

import { createUser } from "../../../../db/tables/User/Repository";
import { NewUser } from "../../../../db/tables/User/Table";
import {
  createUserSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "../../../../db/tables/UserSession/Repository";

export async function Register(newUser: NewUser) {
  "use server";
  // Add zod validation

  try {
    const user = await createUser(newUser);

    if (!user) {
      return {
        message: "An error occurred while trying to make your user :c",
      };
    }

    const token = generateSessionToken();
    const userSession = await createUserSession(token, user.id);

    if (!userSession) {
      return {
        message: "error creating user session :c",
      };
    }

    await setSessionTokenCookie(token, userSession.expiresAt);

    return {
      success: true,
      message: "User registered successfully",
      user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
