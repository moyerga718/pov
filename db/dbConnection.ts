import { Database } from "./tables/Database"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";

/**
 * This is all straight from Kysely docs for how to set up Kysely w/ a postgres db.
 *
 */
const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
