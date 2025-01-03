import { z, ZodType } from "zod";
import { NewUser } from "./Table";

export const NewUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First Name must be at least 3 characters"),
  lastName: z.string().trim().min(3, "Last Name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email address"),
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
}) satisfies ZodType<NewUser>;
