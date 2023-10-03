"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function incrementPlays(id: string, isFinished: boolean) {
  const supabase = createClientComponentClient();

  console.log("WORKOUT ID PLAYS", id);

  if (isFinished) {
    const { data, error } = await supabase.rpc("increment_plays", { workout_id: id });

    if (error) {
      console.log(error.message);
    } else {
      console.log("Play count + 1: ", data);
    }
  } else return;
}
