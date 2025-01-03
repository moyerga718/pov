import { randomUUID } from "crypto";
import { UserUpdate, User, NewUser } from "./Table";
import { Transaction } from "kysely";
import { Database } from "../Database";
import { db } from "../../dbConnection";

/** CREATE */

export async function createUser(person: NewUser, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .insertInto("user")
    .values({
      ...person,
      uuid: randomUUID(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findUserById(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .selectFrom("user")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findUsers(
  criteria: Partial<User>,
  trx: Transaction<Database>
) {
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
  return await query.selectAll().execute();
}

/** UPDATE */

export async function updateUser(
  id: number,
  updateWith: UserUpdate,
  trx: Transaction<Database>
) {
  await (trx ? trx : db)
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
