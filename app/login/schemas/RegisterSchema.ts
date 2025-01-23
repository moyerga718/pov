import { NewUser } from "@/db/tables/User/Table";
import { z, ZodType } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First Name must be at least 3 characters"),
  lastName: z.string().trim().min(3, "Last Name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email address"),
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  password: z.string().trim().min(7, "Password must be at least 7 chracters"),
});
