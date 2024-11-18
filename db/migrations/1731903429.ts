import { Kysely, sql } from "kysely";

/**
 * Make grid_point_count column in grid table default to zero.
 * Unfortunately i can't update default value with kysely?? so im just deleting the column and starting the fuck over.
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("grid").dropColumn("grid_point_count").execute();
  await db.schema
    .alterTable("grid")
    .addColumn("grid_point_count", "integer", (col) =>
      col.defaultTo(0).notNull()
    )
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("grid").dropColumn("grid_point_count").execute();
  await db.schema
    .alterTable("grid")
    .addColumn("grid_point_count", "integer", (col) => col.notNull())
    .execute();
}
