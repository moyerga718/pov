import { Kysely, sql } from "kysely";

/**
 * WHY THE FUCK ARE YOU MAKING THIS MIGRATION. PUT A DESCRIPTION HERE.
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("x")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(null))
    .execute();

  await db.schema
    .createTable("y")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("x_id", "integer", (col) =>
      col.references("x.id").onDelete("cascade").notNull()
    )
    .execute();

  await db.schema.createIndex("y_x_id_index").on("y").column("x_id").execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("x").execute();
  await db.schema.dropTable("y").execute();
}
