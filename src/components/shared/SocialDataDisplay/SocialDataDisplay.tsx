"use client";

import LikeButton from "../../buttons/LikeButton/LikeButton";
import SaveButton from "../../buttons/SaveButton/SaveButton";
import styles from "./SocialDataDisplay.module.scss";
import { FiBarChart2 } from "react-icons/fi";
import { useOptimistic } from "react";

interface SocialData {
  likesCount: number;
  plays: number;
  id: string;
  isSaved: boolean | null;
  isLiked: boolean | null;
  savesCount: number;
}

export default function SocialDataDisplay({
  likesCount,
  plays,
  isSaved,
  id,
  isLiked,
  savesCount,
}: SocialData) {
  const [optimisticSavesCount, toggleOptimisticSavesCount] = useOptimistic(
    savesCount,
    (state, newState) => state + (newState as number)
  );
  const [optimisticLikesCount, toggleOptimisticLikesCount] = useOptimistic(
    likesCount,
    (state, newState) => state + (newState as number)
  );

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <LikeButton
            id={id}
            isLiked={isLiked}
            onToggleLike={(isLiked) => {
              const newState = isLiked ? 1 : -1;
              toggleOptimisticLikesCount(newState);
            }}
          />
          {optimisticLikesCount}
        </div>
        <div className={styles["tooltip-text"]}>Like</div>
      </div>
      <div className={styles.tooltip}>
        <div className={styles.hoverText}>
          <SaveButton
            saved={isSaved}
            id={id}
            onToggleSave={(isSaved) => {
              const newState = isSaved ? 1 : -1;
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
