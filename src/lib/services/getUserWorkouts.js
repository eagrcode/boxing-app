import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getUserWorkouts(id) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.from("workouts").select().eq("user_id", id);

    if (error) {
      console.log("DB error: ", error.message);
    }

    console.log("Fetch workouts: ", data);
    return data;
  } catch (error) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
