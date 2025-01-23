"use server";

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/db/tables/UserSession/Repository";
import { runInTransaction } from "@/db/transactions/runInTransaction";
import { revalidatePath } from "next/cache";

export async function Logout() {
  const session = await getCurrentSession();
  if (!session.user) return;
  await runInTransaction(async (trx) => {
    await invalidateSession(session.userSession.id, trx);
    await deleteSessionTokenCookie();
  });
  revalidatePath("/dashboard");
}
