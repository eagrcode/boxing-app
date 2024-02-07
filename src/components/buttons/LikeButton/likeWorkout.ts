"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function handleLikePost(
  isLiked: boolean | null,
  id: string,
  userID: string,
  path: string
) {
  const supabase = createServerComponentClient({ cookies });

  if (!isLiked) {
    const { error } = await supabase.from("likes").upsert([{ workout_id: id, user_id: userID }]);

    if (error) {
      console.log("Error while liking: ", error.message);
      return { success: false, message: "Error while liking" };
    }
  } else {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("workout_id", id)
      .eq("user_id", userID);

    if (error) {
      console.log("Error while unliking: ", error.message);
      return { success: false, message: "Error while unliking" };
    }
  }

  revalidatePath(path);

  return { success: true, message: isLiked ? "Unliked" : "Liked" };
}
