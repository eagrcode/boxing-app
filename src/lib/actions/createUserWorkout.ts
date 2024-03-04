"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function createWorkout(workoutData: any, path: string) {
  console.log("SERVER ACTION - Create workout: ", workoutData, path);

  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("workouts").insert([workoutData]).select();

  if (error) {
    console.log(error.message);
  } else {
    console.log("Created: ", data);
    revalidatePath("/", "layout");
    redirect("/profile");
  }
}
