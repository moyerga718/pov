import { Kysely, sql } from "kysely";

/**
 * Creating the GRID table
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("grid")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "varchar", (col) => col.notNull())
    .addColumn("north_label", "varchar", (col) => col.notNull())
    .addColumn("east_label", "varchar", (col) => col.notNull())
    .addColumn("south_label", "varchar", (col) => col.notNull())
    .addColumn("west_label", "varchar", (col) => col.notNull())
    .addColumn("grid_point_count", "integer", (col) =>
      col.defaultTo(0).notNull()
    )
    .addColumn("comment_count", "integer", (col) => col.defaultTo(0).notNull())
    .addColumn("created_by_user_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .alterTable("grid")
    .addForeignKeyConstraint(
      "grid_created_by_user_id_constraint",
      ["created_by_user_id"],
      "user",
      ["id"]
    )
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex("grid_created_by_user_id_constraint");
  await db.schema.dropTable("grid").execute();
}
