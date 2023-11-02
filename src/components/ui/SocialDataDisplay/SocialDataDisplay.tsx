"use client";

import LikeButton from "../../buttons/LikeButton/LikeButton";
import SaveButton from "../../buttons/SaveButton/SaveButton";
import styles from "./SocialDataDisplay.module.scss";
import { FiBarChart2 } from "react-icons/fi";
import { useOptimistic } from "react";

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
  const [optimisticSavesCount, toggleOptimisticSavesCount] = useOptimistic(
    savesCount,
    (state, newState) => state + (newState as number)
  );
  const [optimisticLikesCount, toggleOptimisticLikesCount] = useOptimistic(
    likes,
    (state, newState) => state + (newState as number)
  );

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <LikeButton
            onToggleLike={(isLiked) => {
              const newState = isLiked ? 1 : -1;
              toggleOptimisticLikesCount(newState);
            }}
            id={id}
            userID={userID}
            isLiked={isLiked}
          />
          {optimisticLikesCount}
        </div>
        <div className={styles["tooltip-text"]}>Like</div>
      </div>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <SaveButton
            saved={saved}
            id={id}
            onToggleSave={(saved) => {
              const newState = saved ? 1 : -1;
              toggleOptimisticSavesCount(newState);
            }}
          />
          {optimisticSavesCount}
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
