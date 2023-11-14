"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signUpEmail(
  email: string,
  password: string,
  username: string,
  fullName: string
) {
  console.log(email, password, fullName, username);

  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,

          username: username,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
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
