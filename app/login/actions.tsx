"use server";

import { redirect, RedirectType } from "next/navigation";

import { createUser } from "@/db/tables/User/Repository";
import { NewUserSchema } from "@/db/tables/User/Validation";
import { runInTransaction } from "@/db/transactions/runInTransaction";
import {
  createUserSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/db/tables/UserSession/Repository";

import { FormState } from "@/components/forms/types/FormState";

export async function Register(
  state: FormState,
  payload: FormData
): Promise<FormState> {
  "use server";
  const data = Object.fromEntries(payload);
  const result = NewUserSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "Invalid user input",
      fieldErrors: result.error.issues.map((issue) => issue.message),
    };
  }

  try {
    await runInTransaction(async (trx) => {
      const user = await createUser(result.data, trx);
      const token = generateSessionToken();
      const userSession = await createUserSession(token, user.id, trx);
      await setSessionTokenCookie(token, userSession.expiresAt);
      return {
        message: "Successfully created user",
        data: user,
      };
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // this is the error code for a violating a uniqueness constraint in postgres. expand this error section to handle other unexpected errors as they come up.
    if (error.code === "23505") {
      // Extract the constraint name from the error detail
      const constraintMatch = error.detail?.match(/Key \((.*?)\)=/);
      const field = constraintMatch?.[1];

      return {
        message: "Registration failed",
        fieldErrors: [`This ${field} is already taken`],
      };
    }

    return {
      message: "Registration failed. Please try again.",
    };
  }
  redirect("/dashboard", RedirectType.replace);
}
