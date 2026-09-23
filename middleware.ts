import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("session_id")?.value;

  if (!sessionId) {
    const loginUrl = new URL("/login", req.url);

    loginUrl.searchParams.set("redirectTo", req.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transactions/:path*",
    "/api/transactions/:path*",
  ],
};
