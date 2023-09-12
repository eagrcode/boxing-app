import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../database.types";

export default async function isWorkoutSaved(id: string, userID: string) {
  const supabase = createClientComponentClient<Database>();

  console.log("IS SAVED: ", id, userID);

  try {
    const { data, error } = await supabase
      .from("user_saved_workouts")
      .select()
      .eq("workout_id", id)
      .eq("user_id", userID);

    if (error) {
      console.log("database error: ", error);
      return [];
    } else {
      console.log("IS SAVED:", data);
      return data;
    }
  } catch (error: any) {
    console.log("fetch error: ", error.message);
    return [];
  }
}
