import { Transaction } from "kysely";
import { Database } from "../tables/Database";
import { db } from "../dbConnection";

// Transaction utility function
export async function runInTransaction<T>(
  callback: (trx: Transaction<Database>) => Promise<T>
): Promise<T> {
  return await db.transaction().execute(async (trx) => {
    return await callback(trx);
  });
}
