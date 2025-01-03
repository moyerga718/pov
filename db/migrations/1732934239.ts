import { Kysely } from "kysely";

/**
 * adding email and uuid column to user
 * @param db
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("user")
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("uuid", "uuid", (col) => col.notNull().unique())
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("user").dropColumn("email").execute();
  await db.schema.alterTable("user").dropColumn("uuid").execute();
}
