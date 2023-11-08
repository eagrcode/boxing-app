"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function incrementPlays(id: string, path: string) {
  const supabase = createServerComponentClient({ cookies });

  console.log("WORKOUT ID PLAYS", id, path);

  const { data, error } = await supabase.rpc("increment_plays", { workout_id: id });

  if (error) {
    console.log(error.message);
  } else {
    console.log("Play count + 1: ", data);
  }
  revalidatePath(path);
}
