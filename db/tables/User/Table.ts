import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

/**
 * User table.
 * It stores the users, idiot.
 * This will probably need to be beefed up once I add auth in?? I'ma let it chill now tho.
 */
export interface UserTable {
  id: Generated<number>;
  username: string;
  firstName: string;
  lastName: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, never, string | undefined>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
