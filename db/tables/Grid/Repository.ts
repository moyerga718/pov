import { db } from "../../dbConnection";
import { Grid, GridUpdate, NewGrid } from "./Table";

/** CREATE */

export async function createGrid(grid: NewGrid) {
  return await db
    .insertInto("grid")
    .values(grid)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findGridById(id: number) {
  return await db
    .selectFrom("grid")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findGrids(criteria: Partial<Grid>) {
  let query = db.selectFrom("grid");

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

export async function findAllGridsForUser(userId: number) {
  return await db
    .selectFrom("grid")
    .where("createdByUserId", "=", userId)
    .selectAll()
    .execute();
}

/** UPDATE */

export async function updateGrid(id: number, updateWith: GridUpdate) {
  await db.updateTable("grid").set(updateWith).where("id", "=", id).execute();
}

export async function incrementGridPointCount(id: number) {
  return await db
    .updateTable("grid")
    .set((eb) => ({
      gridPointCount: eb("gridPointCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementGridPointCount(id: number) {
  return await db
    .updateTable("grid")
    .set((eb) => ({
      gridPointCount: eb("gridPointCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function incrementGridCommentCount(id: number) {
  return await db
    .updateTable("grid")
    .set((eb) => ({
      commentCount: eb("commentCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementGridCommentCount(id: number) {
  return await db
    .updateTable("grid")
    .set((eb) => ({
      commentCount: eb("commentCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteGrid(id: number) {
  return await db
    .deleteFrom("grid")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
