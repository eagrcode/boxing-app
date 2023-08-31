import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getUserSavedWorkouts(id) {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data, error } = await supabase
      .from("user_saved_workouts")
      .select(
        `
      workout_id,
      workouts: workout_id ("*")
    `
      )
      .eq("user_id", id);

    if (error) {
      console.log("DB error: ", error.message);
    }

    console.log("Fetch saved workouts: ", data);
    return data;
  } catch (error) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
