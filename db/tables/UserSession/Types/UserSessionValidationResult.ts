import { User } from "../../User/Table";
import { UserSession } from "../Table";

export type SessionValidationResult =
  | { userSession: UserSession; user: User }
  | { userSession: null; user: null };
