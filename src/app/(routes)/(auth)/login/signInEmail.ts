"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signInEmail(email: string, password: string) {
  console.log(email, password);

  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
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
