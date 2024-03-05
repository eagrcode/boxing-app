"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function editProfile(name: string, username: string, userID: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: name, username: username })
    .eq("id", userID)
    .select();

  if (error) {
    console.log(error.message);
    return { success: false, message: "Could not update profile" };
  }

  revalidatePath("/profile", "page");
  return { success: true, message: "Profile updated successfully" };
}
