"use server";

import { User } from "@/db/tables/User/Table";
import { getCurrentSession } from "@/db/tables/UserSession/Repository";

export async function GetCurrentUser(): Promise<User | null> {
  const currentSession = await getCurrentSession();
  return currentSession.user;
}
