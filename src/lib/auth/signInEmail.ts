"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

type SignInError = {
  errorType: "auth" | "unexpected";
  message: string;
};

export default async function signInEmail(
  email: string,
  password: string
): Promise<SignInError | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    return { errorType: "auth", message: error.message };
  }

  redirect("/dashboard");
}

// "use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { error } from "@supabase/supabase-js";

// type SignInError = {
//   errorType: "auth" | "unexpected";
//   error;
// };

// export default async function signInEmail(
//   email: string,
//   password: string
// ): Promise<SignInError | null> {
//   const supabase = createClientComponentClient();

//   try {
//     const { error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       console.log(error);
//       return { errorType: "auth", error };
//     }

//     return null;
//   } catch (error: any) {
//     console.error("Unexpected error during sign in:", error);

//     return {
//       errorType: "unexpected",
//       error: new error("An unexpected error occurred during sign in."),
//     };
//   }
// }
