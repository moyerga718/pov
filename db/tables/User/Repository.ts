import { randomUUID } from "crypto";
import { UserUpdate, User, NewUser, UserWithHash } from "./Table";
import { Transaction, UpdateResult } from "kysely";
import { Database } from "../Database";
import { db } from "../../dbConnection";

/**
 * User fields that are safe to return to the client, IE all fields EXCEPT for the user's hash.
 * Use this any time you are pulling users from the database, except for any situation when we need the users hash (Login or password change).
 */
export const SAFE_USER_FIELDS = [
  "id",
  "username",
  "firstName",
  "lastName",
  "email",
  "uuid",
  "createdAt",
  "updatedAt",
] as const;

/** CREATE */

export async function createUser(
  person: NewUser,
  trx: Transaction<Database>
): Promise<User> {
  return await (trx ? trx : db)
    .insertInto("user")
    .values({
      ...person,
      uuid: randomUUID(),
    })
    .returning(SAFE_USER_FIELDS)
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findUserById(
  id: number,
  trx: Transaction<Database>
): Promise<User | undefined> {
  return await (trx ? trx : db)
    .selectFrom("user")
    .where("id", "=", id)
    .select(SAFE_USER_FIELDS)
    .executeTakeFirst();
}

export async function getUserWithHashByUsername(
  username: string,
  trx: Transaction<Database>
): Promise<UserWithHash | undefined> {
  return await (trx ? trx : db)
    .selectFrom("user")
    .where("username", "=", username)
    .selectAll()
    .executeTakeFirst();
}

export async function searchUsers(
  criteria: Partial<User>,
  trx: Transaction<Database>
): Promise<User[]> {
  let query = (trx ? trx : db).selectFrom("user");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id);
  }

  if (criteria.firstName) {
    query = query.where("firstName", "=", criteria.firstName);
  }

  if (criteria.lastName !== undefined) {
    query = query.where(
      "lastName",
      criteria.lastName === null ? "is" : "=",
      criteria.lastName
    );
  }
  return await query.select(SAFE_USER_FIELDS).execute();
}

/** UPDATE */

export async function updateUser(
  id: number,
  updateWith: UserUpdate,
  trx: Transaction<Database>
): Promise<UpdateResult[]> {
  return await (trx ? trx : db)
    .updateTable("user")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteUser(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .deleteFrom("user")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
