import { expressionBuilder } from "kysely";
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

  if (criteria.north_label) {
    query = query.where("title", "ilike", `%${criteria.north_label}%`);
  }

  if (criteria.east_label) {
    query = query.where("title", "ilike", `%${criteria.east_label}%`);
  }

  if (criteria.south_label) {
    query = query.where("title", "ilike", `%${criteria.south_label}%`);
  }

  if (criteria.west_label) {
    query = query.where("title", "ilike", `%${criteria.west_label}%`);
  }

  return await query.selectAll().execute();
}

export async function findAllGridsForUser(userId: number) {
  return await db
    .selectFrom("grid")
    .where("created_by_user_id", "=", userId)
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
      grid_point_count: eb("grid_point_count", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function incrementGridCommentCount(id: number) {
  return await db
    .updateTable("grid")
    .set((eb) => ({
      comment_count: eb("comment_count", "+", 1),
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
