"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function handleSaveWorkout(saved: boolean | null, id: string, path: string) {
  console.log("SERVER ACTION: Save workout", saved, id, path);

  const supabase = createServerComponentClient({ cookies });

  if (!saved) {
    const { error } = await supabase.from("user_saved_workouts").upsert([{ workout_id: id }]);

    if (error) {
      console.log("Error while saving: ", error.message);
      return { success: false, message: "Error while saving workout" };
    }
  } else {
    const { error } = await supabase.from("user_saved_workouts").delete().eq("workout_id", id);

    if (error) {
      console.log("Error while unsaving: ", error.message);
      return { success: false, message: "Error while unsaving workout" };
    }
  }

  revalidatePath("/", "layout");
  return { success: true, message: saved ? "Workout unsaved" : "Workout saved" };
}
