import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("MIDDLEWARE IS WORKING");

  // Paths that require authentication
  const protectedPaths = ["/timer", "/post", "/account", "/workout"];

  // Check if the current path requires authentication
  const requiresAuthentication = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (requiresAuthentication) {
    const supabase = createMiddlewareClient({ req, res: NextResponse.next() });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Redirect to login if not authenticated
    if (!session) {
      return NextResponse.redirect(`${req.nextUrl.origin}/login`);
    }
  }

  return NextResponse.next();
}
