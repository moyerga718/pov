"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import { createUser } from "@/db/tables/User/Repository";
import { runInTransaction } from "@/db/transactions/runInTransaction";
import {
  createUserSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/db/tables/UserSession/Repository";

import { FormState } from "@/components/forms/types/FormState";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { NewUser } from "@/db/tables/User/Table";

export async function Register(
  state: FormState,
  payload: FormData
): Promise<FormState> {
  "use server";
  const data = Object.fromEntries(payload);
  const parsed = RegisterSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid user input",
      fieldErrors: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  try {
    await runInTransaction(async (trx) => {
      // encrypt password
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(parsed.data.password, salt);

      const { password, ...dbUserData } = parsed.data;
      const newUser: NewUser = {
        ...dbUserData,
        hash: Buffer.from(hash),
      };
      const user = await createUser(newUser, trx);
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
      return {
        message: "Registration failed",
        fieldErrors: [`Username or email is already taken`],
        success: false,
      };
    }

    return {
      message: "Registration failed. Please try again.",
      success: false,
    };
  }

  redirect("/dashboard");
}
