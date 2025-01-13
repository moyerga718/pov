import { Kysely, sql } from "kysely";

/**
 * Adds vote table.
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType("vote_type")
    .asEnum(["upvote", "downvote"])
    .execute();

  await db.schema
    .createTable("vote")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addColumn("comment_id", "integer", (col) => col.notNull())
    .addColumn("vote_type", sql`vote_type`, (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(null))
    .execute();

  await db.schema
    .alterTable("vote")
    .addForeignKeyConstraint("vote_user_id_constraint", ["user_id"], "user", [
      "id",
    ])
    .execute();

  await db.schema
    .alterTable("vote")
    .addForeignKeyConstraint(
      "vote_comment_id_constraint",
      ["comment_id"],
      "comment",
      ["id"]
    )
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("vote").execute();
  await db.schema.dropType("vote_type").ifExists().execute();
}
