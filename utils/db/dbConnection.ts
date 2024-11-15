import { Database } from "./tables/Database"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

// TO DO: Add in logic for environment variables.
const dialect = new PostgresDialect({
  pool: new Pool({
    database: "pov_local_db",
    host: "localhost",
    user: "dev_user",
    password: "dev_pass",
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
