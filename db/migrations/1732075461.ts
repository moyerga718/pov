import { Kysely, sql } from "kysely";

/**
 * WHY THE FUCK ARE YOU MAKING THIS MIGRATION. PUT A DESCRIPTION HERE.
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("grid_point")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addColumn("grid_id", "integer", (col) => col.notNull())
    .addColumn("x_value", "integer", (col) => col.notNull())
    .addColumn("y_value", "integer", (col) => col.notNull())
    .addColumn("comment_id", "integer")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(null))
    .execute();

  await db.schema
    .alterTable("grid_point")
    .addForeignKeyConstraint(
      "grid_point_user_id_constraint",
      ["user_id"],
      "user",
      ["id"]
    )
    .execute();

  await db.schema
    .alterTable("grid_point")
    .addForeignKeyConstraint(
      "grid_point_grid_id_constraint",
      ["grid_id"],
      "grid",
      ["id"]
    )
    .execute();

  await db.schema
    .alterTable("grid_point")
    .addForeignKeyConstraint(
      "grid_point_comment_id_constraint",
      ["comment_id"],
      "comment",
      ["id"]
    )
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("grid_point").execute();
}
