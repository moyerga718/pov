import { Transaction } from "kysely";
import { db } from "../../dbConnection";
import { Grid, GridUpdate, NewGrid } from "./Table";
import { Database } from "../Database";

/** CREATE */

export async function createGrid(grid: NewGrid, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .insertInto("grid")
    .values(grid)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findGridById(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .selectFrom("grid")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findGrids(
  criteria: Partial<Grid>,
  trx: Transaction<Database>
) {
  let query = (trx ? trx : db).selectFrom("grid");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id);
  }

  if (criteria.title) {
    query = query.where("title", "ilike", `%${criteria.title}%`);
  }

  if (criteria.northLabel) {
    query = query.where("title", "ilike", `%${criteria.northLabel}%`);
  }

  if (criteria.eastLabel) {
    query = query.where("title", "ilike", `%${criteria.eastLabel}%`);
  }

  if (criteria.southLabel) {
    query = query.where("title", "ilike", `%${criteria.southLabel}%`);
  }

  if (criteria.westLabel) {
    query = query.where("title", "ilike", `%${criteria.westLabel}%`);
  }

  return await query.selectAll().execute();
}

export async function findAllGridsForUser(
  userId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("grid")
    .where("createdByUserId", "=", userId)
    .selectAll()
    .execute();
}

/** UPDATE */

export async function updateGrid(
  id: number,
  updateWith: GridUpdate,
  trx: Transaction<Database>
) {
  await (trx ? trx : db)
    .updateTable("grid")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function incrementGridPointCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("grid")
    .set((eb) => ({
      gridPointCount: eb("gridPointCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementGridPointCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("grid")
    .set((eb) => ({
      gridPointCount: eb("gridPointCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function incrementGridCommentCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("grid")
    .set((eb) => ({
      commentCount: eb("commentCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementGridCommentCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("grid")
    .set((eb) => ({
      commentCount: eb("commentCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteGrid(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .deleteFrom("grid")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
