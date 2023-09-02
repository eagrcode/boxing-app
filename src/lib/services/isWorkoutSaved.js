import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function isWorkoutSaved(id, userID) {
  const supabase = createClientComponentClient();

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
