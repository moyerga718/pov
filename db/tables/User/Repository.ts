import { db } from "../../dbConnection";
import { UserUpdate, User, NewUser } from "./Table";

/** CREATE */

export async function createUser(person: NewUser) {
  return await db
    .insertInto("user")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findUserById(id: number) {
  return await db
    .selectFrom("user")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findUsers(criteria: Partial<User>) {
  let query = db.selectFrom("user");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id);
  }

  if (criteria.first_name) {
    query = query.where("first_name", "=", criteria.first_name);
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      "last_name",
      criteria.last_name === null ? "is" : "=",
      criteria.last_name
    );
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  if (criteria.updated_at) {
    query = query.where("updated_at", "=", criteria.updated_at);
  }

  return await query.selectAll().execute();
}

/** UPDATE */

export async function updateUser(id: number, updateWith: UserUpdate) {
  await db.updateTable("user").set(updateWith).where("id", "=", id).execute();
}

/** DELETE */

export async function deleteUser(id: number) {
  return await db
    .deleteFrom("user")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
