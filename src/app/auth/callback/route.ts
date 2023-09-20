import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const supabase = createRouteHandlerClient({ cookies });
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("REQUEST URL: ", requestUrl);
  console.log("GET CODE: ", code);

  try {
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
  } catch (error: any) {
    console.log(error.message);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(`${requestUrl.origin}/login`));
}
