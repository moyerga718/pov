import { Transaction } from "kysely";
import { db } from "../../dbConnection";
import { GridPointUpdate, NewGridPoint } from "./Table";
import { Database } from "../Database";

/** CREATE */

export async function createGridPoint(
  gridPoint: NewGridPoint,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .insertInto("gridPoint")
    .values(gridPoint)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findGridPointById(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("gridPoint")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findAllGridPointsForGrid(
  gridId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("gridPoint")
    .where("gridId", "=", gridId)
    .selectAll()
    .execute();
}

export async function findAllGridPointsForUser(
  userId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("gridPoint")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
}

export async function findGridPointForComment(
  commentId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("gridPoint")
    .where("commentId", "=", commentId)
    .selectAll()
    .executeTakeFirst();
}

/** UPDATE */

export async function updateGridPoint(
  id: number,
  updateWith: GridPointUpdate,
  trx: Transaction<Database>
) {
  await (trx ? trx : db)
    .updateTable("gridPoint")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteGridPoint(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .deleteFrom("gridPoint")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
