import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";

export default async function getUserHistory(id: string) {
  const supabase = createServerComponentClient<
    Database["public"]["Tables"]["user_workout_history"]["WithProfile"][]
  >({ cookies });

  try {
    const { data, error } = await supabase
      .from("user_workout_history")
      .select(
        `
        *,
        profiles: user_id (username, email),
        workouts: workout_id (*)
      `
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("DB error: ", error.message);
      return [];
    }

    console.log("Fetch user history: ", data);
    return data;
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
