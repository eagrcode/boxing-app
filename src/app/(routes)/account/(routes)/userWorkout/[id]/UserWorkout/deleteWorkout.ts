"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteWorkout(id: string, path: string) {
  console.log("SERVER ACTION: Delete workout", id);
  const supabase = createServerComponentClient({ cookies });

  // Check if there are any likes for the workout
  const { data: likesData, error: likesError } = await supabase
    .from("likes")
    .select("id")
    .eq("workout_id", id);

  if (likesError) {
    console.error("Error fetching likes:", likesError.message);
    return;
  }

  // If likes exist, delete them
  if (likesData && likesData.length > 0) {
    try {
      const { data, error } = await supabase.from("likes").delete().eq("workout_id", id);

      if (error) {
        console.log(error.message);
      } else {
        console.log("Unliked: ", data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // delete workout
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
