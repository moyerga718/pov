import { Kysely, sql } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex("y_x_id_index").execute();
  await db.schema.dropTable("y").execute();
  await db.schema.dropTable("x").execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("x")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
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
