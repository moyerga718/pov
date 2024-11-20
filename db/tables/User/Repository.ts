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

  if (criteria.createdAt) {
    query = query.where("createdAt", "=", criteria.createdAt);
  }

  if (criteria.updatedAt) {
    query = query.where("updatedAt", "=", criteria.updatedAt);
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
