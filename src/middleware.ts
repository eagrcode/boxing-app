import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("MIDDLEWARE IS WORKING: ", req.nextUrl.pathname);

  const publicRoutes: string[] = ["/", "/login", "/signUp"];
  const isPublicRoute: boolean = publicRoutes.some((path) => req.nextUrl.pathname === path);

  const protectedRoutes: string[] = [
    "/dashboard",
    "/timer",
    "/create",
    "/profile",
    "/workout",
    "/discover",
  ];
  const isProtectedRoute: boolean = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const supabase = createMiddlewareClient({ req, res: NextResponse.next() });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Unrequired Authentication: ", isProtectedRoute);
  console.log("Requires Authentication: ", isProtectedRoute);
  console.log("Session: ", session);

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  } else if (isPublicRoute && session?.user) {
    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",

    "/login",
    "/signUp",
    "/dashboard",
    "/timer",
    "/create",
    "/profile",
    "/workout",
    // {
    //   source: "/((?!_next/static|_next/image|favicon.ico).*)",
    // },
  ],
};
