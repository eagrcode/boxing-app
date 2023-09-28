import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";

export default async function isLikedByUser(id: string, userID: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data, error } = await supabase
      .from("likes")
      .select()
      .eq("workout_id", id)
      .eq("user_id", userID);

    if (error) {
      console.log("database error: ", error);
      return null;
    } else {
      return data.length > 0;
    }
  } catch (error: any) {
    console.log("fetch error: ", error.message);
    return false;
  }
}
