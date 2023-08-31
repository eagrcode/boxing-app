"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function handleSaveWorkout(isSaved: boolean, id: string, path: string) {
  console.log("SERVER ACTION: Save workout", isSaved, id, path);

  const supabase = createServerComponentClient({ cookies });

  if (!isSaved) {
    const { data, error } = await supabase
      .from("user_saved_workouts")
      .insert([{ workout_id: id }])
      .select();

    if (error) {
      console.log(error.message);
    } else {
      console.log("Saved: ", data);
    }
  } else {
    const { data, error } = await supabase
      .from("user_saved_workouts")
      .delete()
      .eq("workout_id", id);

    if (error) {
      console.log(error.message);
    } else {
      console.log("Unsaved: ", data);
    }
  }
  revalidatePath(path);
}
