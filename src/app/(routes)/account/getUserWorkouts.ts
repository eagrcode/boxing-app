import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/src/lib/database.types";

export default async function getUserWorkouts(id: string) {
  const supabase = createServerComponentClient<
    Database["public"]["Tables"]["workouts"]["WithProfile"][]
  >({ cookies });

  try {
    const { data, error } = await supabase
      .from("workouts")
      .select(
        `
        *,
        profiles: user_id (username)
      `
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("DB error: ", error.message);
      return [];
    }

    console.log("Fetch workouts: ", data);
    return data;
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
