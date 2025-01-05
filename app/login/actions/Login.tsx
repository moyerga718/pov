import { FormState } from "@/components/forms/types/FormState";
import { z } from "zod";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function Login(
  state: FormState,
  payload: FormData
): Promise<FormState> {
  "use server";
  const data = Object.fromEntries(payload);
  const result = LoginSchema.safeParse(data);

  return {
    message: result.toString(),
  };
}
