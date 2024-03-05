"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type ReturnTypes = {
  workouts_count: number;
  saved_workouts_count: number;
};

export default async function getProfileWorkoutCounts(): Promise<ReturnTypes> {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.rpc("get_user_workouts_counts");
    if (error || !data) {
      console.error(error?.message || "No data received.");
      return { workouts_count: 0, saved_workouts_count: 0 };
    }

    console.log(data[0]);
    return data[0];
  } catch (error: any) {
    console.error(error.message);
    return { workouts_count: 0, saved_workouts_count: 0 };
  }
}
