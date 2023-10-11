"use client";

// styles
import styles from "./LikeButton.module.scss";

// next
import { usePathname } from "next/navigation";

// utils
import likeWorkout from "./likeWorkout";

import Button from "./Button";

import { experimental_useOptimistic as useOptimistic } from "react";

interface LikesDisplayPropTypes {
  id: string;
  userID: string;
  isLiked: boolean | null;
  onToggleLike: (isLiked: any) => void;
}

export default function LikeButton({ id, userID, isLiked, onToggleLike }: LikesDisplayPropTypes) {
  const path = usePathname();

  const [optimisticLike, toggleOptimisticLike] = useOptimistic(isLiked, (state, _) => !state);

  return (
    <form
      action={async () => {
        toggleOptimisticLike(isLiked);
        onToggleLike(!isLiked);
        await likeWorkout(isLiked, id, userID, path);
      }}
    >
      <Button optimisticLike={optimisticLike} />
    </form>
  );
}
