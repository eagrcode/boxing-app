"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";

type SignInError = {
  errorType: "auth" | "unexpected";
  error: AuthError;
};

export default async function signInEmail(
  email: string,
  password: string
): Promise<SignInError | null> {
  console.log(email, password);

  const supabase = createClientComponentClient();

  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      console.log("DB SIGN IN ERROR: ", authError);
      return { errorType: "auth", error: authError };
    }

    return null; // Explicitly return null when there's no error.
  } catch (error: any) {
    console.error("Unexpected error during sign in:", error);
    // Return a structured error for unexpected issues.
    return {
      errorType: "unexpected",
      error: new AuthError("An unexpected error occurred during sign in."),
    };
  }
}
