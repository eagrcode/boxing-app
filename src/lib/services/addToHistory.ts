"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function addToHistory(id: string) {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.from("user_workout_history").upsert([{ workout_id: id }]);

  if (error) {
    console.log(error.message);
  } else {
    console.log("Added to user history: ", data);
  }
}
