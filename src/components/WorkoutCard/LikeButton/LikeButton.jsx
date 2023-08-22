"use client";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// icons
import { GiPunchBlast } from "react-icons/gi";

export default function LikeButton({ id, userID }) {
  const supabase = createClientComponentClient();

  // handle like post
  const handleLikePost = async () => {
    const { data, error } = await supabase
      .from("likes")
      .insert([{ workout_id: id, user_id: userID }])
      .select();

    if (error) {
      console.log(error.message);
    } else {
      console.log("Liked: ", data);
    }
  };

  return (
    <button onClick={handleLikePost}>
      <GiPunchBlast size={20} />
      Like
    </button>
  );
}
