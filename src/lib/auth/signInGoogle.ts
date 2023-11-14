"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signInGoogle() {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("DB SIGN UP ERROR: ", error);
    } else {
      console.log(data);
    }
  } catch (error: any) {
    console.log(error);
  }
}
