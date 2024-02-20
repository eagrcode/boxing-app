"use client";

import { usePathname } from "next/navigation";
import handleLikePost from "./likeWorkout";
import Button from "./Button";
import { useAppSelector } from "@/src/redux/hooks";
import { useOptimistic } from "react";

interface LikeButton {
  id: string;
  isLiked: boolean | null;
  onToggleLike: (isLiked: boolean) => void;
}

export default function LikeButton({ id, isLiked, onToggleLike }: LikeButton) {
  const { userID } = useAppSelector((state) => state.auth);
  const [optimisticLike, toggleOptimisticLike] = useOptimistic(isLiked, (state, _) => !state);
  const path = usePathname();

  const handleLike = async () => {
    toggleOptimisticLike(isLiked);
    onToggleLike(!isLiked);
    await handleLikePost(isLiked, id, userID, path);
  };

  return (
    <form action={handleLike}>
      <Button optimisticLike={optimisticLike} />
    </form>
  );
}
