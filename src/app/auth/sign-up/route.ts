import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));
  const username = String(formData.get("username"));
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username: username,
        },
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login?error=Could not authenticate user`, {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      });
    }
  } catch (error: any) {
    console.log(error);
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
