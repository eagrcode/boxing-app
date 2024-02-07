import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../types/database.types";

export default async function isLikedByUser(id: string, userID: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data, error, count } = await supabase
      .from("likes")
      .select("id", { count: "exact" }) // Only select the 'id' column and get the count
      .filter("workout_id", "eq", id)
      .filter("user_id", "eq", userID);

    if (error) {
      console.log("database error: ", error);
      return null;
    } else {
      return count ? count > 0 : false; // Return true if count is more than 0
    }
  } catch (error: any) {
    console.log("fetch error: ", error.message);
    return false;
  }
}
