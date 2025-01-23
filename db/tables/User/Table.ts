import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

/**
 * Stores basic user info.
 * Something to be careful with - we are storing the user's hashed password on this table. For 99.9% of user calls, we do NOT want to return this to the front end.
 * So, we have two selectable types at the bottom: one with the hash, one without.
 * Whenever
 */
export interface UserTable {
  id: Generated<number>;
  username: string;
  firstName: string;
  lastName: string;
  hash: ColumnType<Buffer, Buffer, never>;
  email: string;
  uuid: Generated<string>;
  createdAt: ColumnType<string, string | undefined, never>;
  updatedAt: ColumnType<string, never, string | undefined>;
}

// Regular user types (No hash, used for things like searching for users etc)
export type User = Omit<Selectable<UserTable>, "hash">;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
export type UserWithHash = Selectable<UserTable>;
