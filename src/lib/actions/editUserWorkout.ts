"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function handleSubmit(workoutData: any, workoutID: string, path: string) {
  console.log("SERVER ACTION - Edit workout: ", workoutData, workoutID, path);

  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("workouts")
    .update(workoutData)
    .eq("id", workoutID)
    .select();

  if (error) {
    console.log(error.message);
  } else {
    console.log("Edited: ", data);
    revalidatePath(path);
    redirect("/account");
  }
}
