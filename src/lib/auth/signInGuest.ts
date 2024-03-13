"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signInGuest() {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_GUEST_USER_EMAIL as string,
      password: process.env.NEXT_PUBLIC_GUEST_USER_PASS as string,
    });

    if (error) {
      console.log("DB SIGN IN ERROR: ", error);
    } else {
      console.log(data);
    }
  } catch (error: any) {
    console.log(error);
  }
}
