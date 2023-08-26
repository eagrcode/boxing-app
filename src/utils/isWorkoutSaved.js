import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function isWorkoutSaved(id, userID) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("user_saved_workouts")
      .select()
      .eq("workout_id", id)
      .eq("user_id", userID);

    if (error) {
      console.log("database error: ", error);
    } else {
      console.log(data);

      return data;
    }
  } catch (error) {
    console.log("fetch error: ", error.message);
  }
}
