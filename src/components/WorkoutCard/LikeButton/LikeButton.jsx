"use client";

// styles
import styles from "./LikeButton.module.scss";

// react
import { useState } from "react";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// icons
import { GiPunchBlast } from "react-icons/gi";

export default function LikeButton({ id, userID, likes }) {
  // init supabase client
  const supabase = createClientComponentClient();

  // check if user has already liked this workout - convert to bool
  const findLike = !!likes.find((like) => like.user_id === userID);

  const [isLikedByUser, setIsLikedByUser] = useState(findLike);

  // handle like post
  const handleLikePost = async () => {
    if (!isLikedByUser) {
      const { data, error } = await supabase
        .from("likes")
        .insert([{ workout_id: id, user_id: userID }])
        .select();

      if (error) {
        console.log(error.message);
      } else {
        console.log("Liked: ", data);
        setIsLikedByUser((prev) => !prev);
      }
    } else {
      const { data, error } = await supabase.from("likes").delete().eq("workout_id", id);

      if (error) {
        console.log(error.message);
      } else {
        console.log("Unliked: ", data);
        setIsLikedByUser((prev) => !prev);
      }
    }
  };

  return (
    <button
      className={styles.likeBtn}
      onClick={handleLikePost}
      style={{ color: `${isLikedByUser ? "var(--accent-color-blue)" : "var(--text-color-main)"}` }}
    >
      <GiPunchBlast size={20} />
      Like
    </button>
  );
}
