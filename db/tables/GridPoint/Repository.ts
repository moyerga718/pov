import { db } from "../../dbConnection";
import { GridPointUpdate, NewGridPoint } from "./Table";

/** CREATE */

export async function createGridPoint(gridPoint: NewGridPoint) {
  return await db
    .insertInto("gridPoint")
    .values(gridPoint)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findGridPointById(id: number) {
  return await db
    .selectFrom("gridPoint")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findAllGridPointsForGrid(gridId: number) {
  return await db
    .selectFrom("gridPoint")
    .where("gridId", "=", gridId)
    .selectAll()
    .execute();
}

export async function findAllGridPointsForUser(userId: number) {
  return await db
    .selectFrom("gridPoint")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
}

export async function findGridPointForComment(commentId: number) {
  return await db
    .selectFrom("gridPoint")
    .where("commentId", "=", commentId)
    .selectAll()
    .executeTakeFirst();
}

/** UPDATE */

export async function updateGridPoint(id: number, updateWith: GridPointUpdate) {
  await db
    .updateTable("gridPoint")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteGridPoint(id: number) {
  return await db
    .deleteFrom("gridPoint")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
