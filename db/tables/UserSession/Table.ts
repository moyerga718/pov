import { Insertable, Selectable, Updateable } from "kysely";

/**
 * User session table for authentication
 */
export interface UserSessionTable {
  id: string;
  userId: number;
  expiresAt: Date;
}

export type UserSession = Selectable<UserSessionTable>;
export type NewUserSession = Insertable<UserSessionTable>;
export type UserSessionUpdate = Updateable<UserSessionTable>;
