"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function addToCompletedWorkouts(id: string | null) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  console.log("SERVER ACTION: ", id);

  const { data, error } = await supabase
    .from("data_set_user_completed_workouts")
    .upsert([{ workout_id: id }]);

  if (error) {
    console.log(error.message);
  } else {
    console.log("Added to user completed workouts: ", data);
  }

  revalidatePath("/");
}
