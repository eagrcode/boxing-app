import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";

export default async function getWorkoutLikes(id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data, error } = await supabase.from("likes").select().eq("workout_id", id);

    if (error) {
      console.log("database error: ", error);
      return [];
    } else {
      console.log("LIKES: ", data);
      return data;
    }
  } catch (error: any) {
    console.log("fetch error: ", error.message);
    return [];
  }
}
