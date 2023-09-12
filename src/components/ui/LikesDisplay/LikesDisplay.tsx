// styles
import styles from "./LikesDisplay.module.scss";

interface LikesDisplayPropTypes {
  likes: {
    created_at: string;
    id: number;
    user_id: string | null;
    workout_id: string | null;
  }[];
}

export default function LikesDisplay({ likes }: LikesDisplayPropTypes) {
  return (
    <div className={styles.likesContainer}>
      {
        <span>
          {likes?.length > 0 && `${likes?.length} ${likes?.length > 1 ? "likes" : "like"}`}
        </span>
      }
    </div>
  );
}
