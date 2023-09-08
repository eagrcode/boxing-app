"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signUpEmail(
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string
) {
  console.log(email, password, firstName, lastName, username);

  const supabase = createClientComponentClient();

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
