import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "../../dbConnection";
import { NewUserSession, UserSession } from "./Table.js";
import { SessionValidationResult } from "./Types/UserSessionValidationResult.js";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { User } from "../User/Table";
import { cookies } from "next/headers";
import { cache } from "react";
import { Transaction } from "kysely";
import { Database } from "../Database";

/**
 * Okay so I don't know if all of this should live here, but this is all my session management code.
 * Its kind of CRUD-ey? I can move it out ifn i need to.
 * Most of this logic is from the lucia documentation for how to integrate session-based auth into a nextjs project.
 * https://lucia-auth.com/sessions/basic-api/postgresql
 */

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createUserSession(
  token: string,
  userId: number,
  trx: Transaction<Database>
): Promise<UserSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionInput: NewUserSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await trx.insertInto("userSession").values(sessionInput).execute();
  return sessionInput;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  // Find user session and user info based off encoded token.
  const foundUserSessionAndUser = await db
    .selectFrom("userSession")
    .innerJoin("user", "user.id", "userSession.userId")
    .select([
      "userSession.id",
      "userSession.userId",
      "userSession.expiresAt",
      "user.firstName",
      "user.lastName",
      "user.username",
      "user.email",
      "user.uuid",
      "user.createdAt",
      "user.updatedAt",
    ])
    .where("userSession.id", "=", sessionId)
    .executeTakeFirst();

  // return null objects if no session was found
  if (foundUserSessionAndUser === undefined) {
    return { userSession: null, user: null };
  }

  const foundUserSession: UserSession = {
    id: foundUserSessionAndUser.id,
    userId: foundUserSessionAndUser.userId,
    expiresAt: foundUserSessionAndUser.expiresAt,
  };
  // this don't feel great tbh, i wanna find a better way around this. Maybe just make this type Partial<User>?
  const foundUser: User = {
    id: foundUserSessionAndUser.userId,
    firstName: foundUserSessionAndUser.firstName,
    lastName: foundUserSessionAndUser.lastName,
    username: foundUserSessionAndUser.username,
    email: foundUserSessionAndUser.email,
    uuid: foundUserSessionAndUser.uuid,
    createdAt: foundUserSessionAndUser.createdAt,
    updatedAt: foundUserSessionAndUser.updatedAt,
  };

  // Return null objects if session is expired.
  if (Date.now() >= foundUserSession.expiresAt.getTime()) {
    await db
      .deleteFrom("userSession")
      .where("id", "=", foundUserSession.id)
      .execute();
    return { userSession: null, user: null };
  }

  // Session is stil valid - extend expiration date and return valid session
  if (
    Date.now() >=
    foundUserSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
  ) {
    foundUserSession.expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    );
    await db
      .updateTable("userSession")
      .set(foundUserSession)
      .where("id", "=", foundUserSession.id)
      .execute();
  }
  return { userSession: foundUserSession, user: foundUser };
}

export async function invalidateSession(
  userSessionId: string,
  trx: Transaction<Database>
): Promise<void> {
  await trx.deleteFrom("userSession").where("id", "=", userSessionId).execute();
}

// ...

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;
    if (token === null) {
      return { userSession: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);
