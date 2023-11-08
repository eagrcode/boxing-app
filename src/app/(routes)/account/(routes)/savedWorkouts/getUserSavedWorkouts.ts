import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/src/lib/database.types";

export default async function getUserSavedWorkouts(id: string) {
  const supabase = createServerComponentClient<
    Database["public"]["Tables"]["user_saved_workouts"]["WithProfile"][]
  >({ cookies });

  try {
    const { data, error } = await supabase
      .from("user_saved_workouts")
      .select(
        `
        *,
        profiles: user_id (username, email, full_name),
        workouts: workout_id (*)
      `
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("DB error: ", error.message);
      return [];
    }

    console.log("Fetch saved workouts: ", data);
    return data;
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
