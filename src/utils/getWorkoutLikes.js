import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getWorkoutLikes(id) {
  const supabase = createServerComponentClient({ cookies });

  console.log(id);

  try {
    const { data, error } = await supabase.from("likes").select().eq("workout_id", id);

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
