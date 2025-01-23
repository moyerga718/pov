import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  password: z.string().trim().min(7, "Password must be at least 7 characters"),
});
