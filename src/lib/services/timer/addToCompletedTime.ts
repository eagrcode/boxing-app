"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function addToCompletedTime(totalTimeSeconds: number) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  console.log("SERVER ACTION: ", totalTimeSeconds);

  try {
    const { data, error } = await supabase
      .from("completed_time")
      .upsert([{ time: totalTimeSeconds }]);

    if (error) {
      console.log(error.message);
    } else {
      console.log("Successfully incremented user minutes: ", data);
    }
  } catch (error: any) {
    console.log("function error: ", error.message);
  }

  revalidatePath("/dashboard");
}
