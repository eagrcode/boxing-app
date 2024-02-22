import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const publicRoutes: string[] = ["/", "/login", "/signUp"];
  const isPublicRoute: boolean = publicRoutes.some((path) => request.nextUrl.pathname === path);

  const protectedRoutes: string[] = [
    "/dashboard",
    "/timer",
    "/create",
    "/profile",
    "/workout",
    "/discover",
  ];
  const isProtectedRoute: boolean = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  } else if (isPublicRoute && user) {
    return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   console.log("MIDDLEWARE IS WORKING: ", req.nextUrl.pathname);

//   const publicRoutes: string[] = ["/", "/login", "/signUp"];
//   const isPublicRoute: boolean = publicRoutes.some((path) => req.nextUrl.pathname === path);

//   const protectedRoutes: string[] = [
//     "/dashboard",
//     "/timer",
//     "/create",
//     "/profile",
//     "/workout",
//     "/discover",
//   ];
//   const isProtectedRoute: boolean = protectedRoutes.some((path) =>
//     req.nextUrl.pathname.startsWith(path)
//   );

//   const supabase = createMiddlewareClient({ req, res: NextResponse.next() });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log("Unrequired Authentication: ", isPublicRoute);
//   console.log("Requires Authentication: ", isProtectedRoute);
//   console.log("Session: ", user);

//   if (isProtectedRoute && !user) {
//     return NextResponse.redirect(`${req.nextUrl.origin}/login`);
//   } else if (isPublicRoute && user) {
//     return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",

//     "/login",
//     "/signUp",
//     "/dashboard",
//     "/timer",
//     "/create",
//     "/profile",
//     "/workout",
//     // {
//     //   source: "/((?!_next/static|_next/image|favicon.ico).*)",
//     // },
//   ],
// };
