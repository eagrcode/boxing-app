import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type SignUpResponse = {
  success: boolean;
  message: string;
};

export default async function signUpEmail(
  email: string,
  password: string,
  username: string,
  fullName: string
): Promise<SignUpResponse> {
  console.log(email, password, username, fullName);
  const supabase = createClientComponentClient();

  try {
    // Check if the email already exists in the profiles table
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email);

    if (error) {
      console.error("Error checking email existence:", error.message);
      return { success: false, message: "Unexpected error checking email existence" };
    }

    if (profiles.length > 0) {
      console.log("Email already exists in profiles table.");

      return {
        success: false,
        message: "Email already exists. Please use a different email address.",
      };
    }

    // Email doesn't exist, proceed with sign-up
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          username: username,
          avatar_url: "",
          email: email,
        },

        emailRedirectTo: `${location.origin}/login`,
      },
    });

    if (signUpError) {
      console.error("Error during sign up:", signUpError.message);
      return { success: false, message: signUpError.message };
    }

    console.log("User created successfully. ID:", data);
    return { success: true, message: "User created successfully!" };
  } catch (error: any) {
    console.error("Unexpected error during sign up:", error.message);
    return { success: false, message: error.message };
  }
}
