"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function addToCompletedRounds(rounds: number) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  console.log("SERVER ACTION: ", rounds);

  try {
    const { data, error } = await supabase.from("completed_rounds").upsert([{ rounds: rounds }]);

    if (error) {
      console.log(error.message);
    } else {
      console.log("Successfully added to completed rounds: ", data);
    }
  } catch (error: any) {
    console.log("function error: ", error.message);
  }

  revalidatePath("/dashboard");
}
