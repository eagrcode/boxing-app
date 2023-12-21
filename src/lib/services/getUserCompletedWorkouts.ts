import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { count } from "console";
import { cookies } from "next/headers";

export default async function getUserCompletedWorkouts(id: string) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { count, error } = await supabase
      .from("data_set_user_completed_workouts")
      .select("created_at", { count: "exact" })
      .eq("user_id", id);

    if (error) {
      console.log("DB error: ", error.message);
      return 0;
    }

    console.log("COMPLETED WORKOUTS", count);
    return count || 0;
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return 0;
  }
}
