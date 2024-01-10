"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function addToHistory(id: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("user_workout_history").upsert([{ workout_id: id }]);

  if (error) {
    console.log(error.message);
  } else {
    console.log("Added to user history: ", data);
  }

  revalidatePath("/account/history");
}
