import LikeButton from "../../buttons/LikeButton/LikeButton";
import SaveButton from "../../buttons/SaveButton/SaveButton";
import styles from "./SocialDataDisplay.module.scss";
import { FiBarChart2 } from "react-icons/fi";

interface LikesDisplayPropTypes {
  likes: number;
  plays: number;
  id: string;
  userID: string;
  saved: boolean | null;
  isLiked: boolean | null;
  savesCount: number;
}

export default function SocialDataDisplay({
  likes,
  plays,
  saved,
  id,
  userID,
  isLiked,
  savesCount,
}: LikesDisplayPropTypes) {
  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <LikeButton id={id} userID={userID} isLiked={isLiked} />
          {likes}
        </div>
        <div className={styles["tooltip-text"]}>Like</div>
      </div>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <SaveButton saved={saved} id={id} />
          {savesCount}
        </div>
        <div className={styles["tooltip-text"]}>Save</div>
      </div>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <FiBarChart2 size={20} /> {plays}
        </div>
        <div className={styles["tooltip-text"]}>Plays</div>
      </div>
    </div>
  );
}
