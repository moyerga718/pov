"use server";

import { FormState } from "@/components/forms/types/FormState";
import bcrypt from "bcrypt";
import {
  createUserSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/db/tables/UserSession/Repository";
import { runInTransaction } from "@/db/transactions/runInTransaction";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUserWithHashByUsername } from "@/db/tables/User/Repository";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const ARTIFICIAL_DELAY_MS = 1000;

export async function Login(
  state: FormState,
  payload: FormData
): Promise<FormState> {
  const data = Object.fromEntries(payload);
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "Invalid user input",
      fieldErrors: result.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const responseMessage = await runInTransaction(async (trx) => {
    // fetch user that matches information credential information
    const user = await getUserWithHashByUsername(result.data.username, trx);
    if (!user) {
      // artificial password resolution for consistent timing.
      await bcrypt.compare(result.data.password, "$2b$10$" + "a".repeat(53));
      await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));
      return {
        message: "Invalid credentials",
        success: false,
      };
    }

    const passwordValid = await bcrypt.compare(
      result.data.password,
      user.hash.toString()
    );

    if (!passwordValid) {
      await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));
      return {
        message: "Invalid credentials",
        success: false,
      } as FormState;
    }

    const token = generateSessionToken();
    const session = await createUserSession(token, user.id, trx);
    console.log("setting session token");
    await setSessionTokenCookie(token, session.expiresAt);
    console.log("session cookie set");
    return {
      message: "Successfully logged in.",
      success: true,
    } as FormState;
  });

  if (!responseMessage.success) {
    return responseMessage;
  }
  console.log("redirecting");
  redirect("/dashboard");
}
