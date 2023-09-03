"use client";

// styles
import styles from "./LikeButton.module.scss";

// next
import { usePathname } from "next/navigation";

// utils
import likeWorkout from "@/src/lib/actions/likeWorkout";

// icons
import { GiPunchBlast } from "react-icons/gi";

export default function LikeButton({ id, userID, likes }) {
  // check if user has already liked this workout - convert to bool
  const isLiked = !!likes?.find((like) => like.user_id === userID);

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
