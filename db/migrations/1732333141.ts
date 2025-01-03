import { Kysely } from "kysely";

/**
 * USER SESSION TABLE I GUESS????
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user_session")
    .addColumn("id", "text", (col) => col.primaryKey().notNull())
    .addColumn("user_id", "integer", (col) =>
      col.notNull().references("user.id")
    )
    .addColumn("expires_at", "timestamp", (col) => col.notNull())
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_session").execute();
}
