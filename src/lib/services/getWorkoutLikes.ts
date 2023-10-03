import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";

export default async function getWorkoutLikesCount(id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { count, error } = await supabase
      .from("likes")
      .select("", { count: "exact" }) // This gets only the count
      .eq("workout_id", id);

    if (error) {
      console.log("database error: ", error);
      return 0;
    } else {
      console.log("LIKES COUNT: ", count);
      return count || 0;
    }
  } catch (error: any) {
    console.log("fetch error: ", error.message);
    return 0;
  }
}
