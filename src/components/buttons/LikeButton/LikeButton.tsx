"use client";

// styles
import styles from "./LikeButton.module.scss";

// next
import { usePathname } from "next/navigation";

// utils
import likeWorkout from "./likeWorkout";

// icons
import { GiPunchBlast } from "react-icons/gi";

interface LikesDisplayPropTypes {
  id: string;
  userID: string;
  isLiked: boolean | null;
}

export default function LikeButton({ id, userID, isLiked }: LikesDisplayPropTypes) {
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
        <GiPunchBlast size={20} />
      </button>
    </form>
  );
}
