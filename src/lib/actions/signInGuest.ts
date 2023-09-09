"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signInGuest() {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "guest@guest.com",
      password: "guestuser9000",
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
