import { Kysely, sql } from "kysely";

/**
 * I'm making the comment table!!!! Its not a big deal. Get off my ass about it.
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("comment")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("userId", "integer", (col) => col.notNull())
    .addColumn("gridId", "integer", (col) => col.notNull())
    .addColumn("text", "varchar", (col) => col.notNull())
    .addColumn("vote_count", "integer", (col) => col.defaultTo(0).notNull())
    .addColumn("comment_count", "integer", (col) => col.defaultTo(0).notNull())
    .addColumn("parent_comment_id", "integer")
    .addColumn("top_level_comment_id", "integer")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(null))
    .execute();

  await db.schema
    .alterTable("comment")
    .addForeignKeyConstraint(
      "comment_user_id_constraint",
      ["user_id"],
      "user",
      ["id"]
    )
    .execute();

  await db.schema
    .alterTable("comment")
    .addForeignKeyConstraint(
      "comment_grid_id_constraint",
      ["grid_id"],
      "grid",
      ["id"]
    )
    .execute();

  await db.schema
    .alterTable("comment")
    .addForeignKeyConstraint(
      "comment_parent_comment_id_constraint",
      ["parent_comment_id"],
      "comment",
      ["id"]
    )
    .execute();

  await db.schema
    .alterTable("comment")
    .addForeignKeyConstraint(
      "comment_top_level_comment_id_constraint",
      ["top_level_comment_id"],
      "comment",
      ["id"]
    )
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("comment").execute();
}
