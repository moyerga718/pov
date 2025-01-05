import { NextRequest, NextResponse } from "next/server";

/**
 * Authentication middleware.... i should look more into how this works once i have a better understanding of next. This is pretty much copy n paste from lucia docs.
 * @param request
 * @returns
 */
export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse> {
  /**
   * TBH i don't think i need this unless i start actually using the api instead of server actions. So. Ima get rid of it.
   * FROM LUCIA DOCS:
   * Since we can't extend set cookies insides server components due to a limitation with React, we recommend continuously extending the cookie expiration inside middleware.
   * However, this comes with its own issue. We can't detect if a new cookie was set inside server actions or route handlers from middleware.
   * This becomes an issue if we need to assign a new session inside server actions (e.g. after updating the password) as the middleware cookie will override it.
   * As such, we'll only extend the cookie expiration on GET requests.
   */
  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;
    if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return response;
  }

  // CSRF PROTECTION
  const originHeader = request.headers.get("Origin");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  return NextResponse.next();
}
