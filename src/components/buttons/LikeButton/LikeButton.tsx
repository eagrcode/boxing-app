"use client";

// styles
import styles from "./LikeButton.module.scss";

// next
import { usePathname } from "next/navigation";

// utils
import likeWorkout from "@/src/lib/actions/likeWorkout";

// icons
import { GiPunchBlast } from "react-icons/gi";

interface LikesDisplayPropTypes {
  id: string;
  userID: string;
  likes: {
    created_at: string;
    id: number;
    user_id: string | null;
    workout_id: string | null;
  }[];
}

export default function LikeButton({ id, userID, likes }: LikesDisplayPropTypes) {
  // check if user has already liked this workout - convert to bool
  const isLiked = !!likes?.find((like) => like.user_id === userID);

  console.log(userID);
  console.log(likes);
  console.log(isLiked);

  const path = usePathname();

  return (
    <form action={() => likeWorkout(isLiked, id, userID, path)}>
      <button
        type="submit"
        className={styles.likeBtn}
        style={{
          color: `${isLiked ? "var(--accent-color-blue)" : "var(--text-color-main)"}`,
        }}
      >
        <GiPunchBlast size={25} />
      </button>
    </form>
  );
}
