import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../database.types";

export default async function isWorkoutSaved(id: string, userID: string) {
  const supabase = createClientComponentClient<Database>();

  try {
    const { count, error } = await supabase
      .from("user_saved_workouts")
      .select("id", { count: "exact" })
      .filter("workout_id", "eq", id)
      .filter("user_id", "eq", userID);

    if (error) {
      console.log("database error: ", error);
      return null;
    } else {
      console.log("IS SAVED:", count);
      return count ? count > 0 : false;
    }
  } catch (error: any) {
    console.log("fetch error: ", error.message);
    return false;
  }
}
