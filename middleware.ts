import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth";

// // General middleware function to execute authentication middleware. This should be expanded to have
// // 1. URL Matchers
// // 2. also be able to user other middleware functions.
export async function middleware(request: NextRequest): Promise<NextResponse> {
  return await authMiddleware(request);
}
