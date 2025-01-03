import { Insertable, Selectable, Updateable } from "kysely";

/**
 * User session table for auth....
 * I guess im making my own auth???
 * This will probably need to be beefed up once I add auth in?? I'ma let it chill now tho.
 */
export interface UserSessionTable {
  id: string;
  userId: number;
  expiresAt: Date;
}

export type UserSession = Selectable<UserSessionTable>;
export type NewUserSession = Insertable<UserSessionTable>;
export type UserSessionUpdate = Updateable<UserSessionTable>;
