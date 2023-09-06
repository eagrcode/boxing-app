"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signInEmail(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  console.log(email, password);

  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("DB SIGN IN ERROR: ", error);
    } else {
      console.log(data);
      redirect("http://localhost:3000");
    }
  } catch (error: any) {
    console.log(error);
  }
}
