// This interface describes the `person` table to Kysely. Table
// interfaces should only be used in the `Database` type above
// and never as a result type of a query!. See the `Person`,

import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

// `NewPerson` and `PersonUpdate` types below.
export interface PersonTable {
  id: Generated<number>;
  first_name: string;
  gender: "man" | "woman" | "other";
  last_name: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  metadata: JSONColumnType<{
    login_at: string;
    ip: string | null;
    agent: string | null;
    plan: "free" | "premium";
  }>;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;
