import { Kysely, sql } from "kysely";

/**
 * Adding the comment_count column to the grid table... forgot in the og migration oopsies
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("grid")
    .addColumn("comment_count", "integer", (col) => col.defaultTo(0).notNull())
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("grid").dropColumn("comment_count").execute();
}
