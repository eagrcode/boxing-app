"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteWorkout(id: string, path: string) {
  console.log("SERVER ACTION: Delete workout", id);
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.from("workouts").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error.message);
      return;
    }

    console.log("Deleted workout: ", id);
  } catch (error: any) {
    console.error("Unexpected error: ", error.message);
  }

  revalidatePath(path);
  redirect("/account");
}
