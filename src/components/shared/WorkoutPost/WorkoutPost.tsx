"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./WorkoutPost.module.scss";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import SocialDataDisplay from "@/src/components/shared/SocialDataDisplay/SocialDataDisplay";
import { MdOutlineTimer } from "react-icons/md";
import { BsLightningCharge, BsHourglassTop } from "react-icons/bs";
import type { WorkoutPost } from "@/src/lib/types/workout.types";
import WorkoutAvatar from "../WorkoutAvatar/WorkoutAvatar";
import { useAppDispatch } from "@/src/redux/hooks";
import { setIsActive } from "@/src/redux/workoutSlice";

export default function WorkoutPost({
  index,
  selectedIndex,
  id,
  title,
  description,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdBy,
  createdAt,
  plays,
  name,
  isLiked,
  isSaved,
  savesCount,
  likesCount,
}: WorkoutPost) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  function handleSelect(param: string) {
    // if (isActive) return;

    const params = new URLSearchParams(searchParams);
    param ? params.set("query", param) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);

    dispatch(setIsActive());
  }

  return (
    <div key={id} className={`${styles.card} ${index === selectedIndex && styles.isActive}`}>
      <div className={styles.linkWrapper} onClick={() => handleSelect(id)}>
        <div className={styles.cardTop}>
          <div className={styles.usernameContainer}>
            <WorkoutAvatar fullName={name} avatarURL={""} />
            <p>{createdBy}</p>
          </div>
          <span>{formatTimeAgo(createdAt)}</span>
        </div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.overview}>
          <p>{description}</p>
        </div>

        <div className={styles.info}>
          <div className={styles.infoDisplay}>
            <MdOutlineTimer size={20} />
            <span>{formatTimeDisplay(totalTime)}</span>
          </div>
          <div className={styles.infoDisplay}>
            <BsLightningCharge size={20} />
            <span>{workoutRounds}</span>
          </div>
          <div className={styles.infoDisplay}>
            <BsHourglassTop size={18} />
            <span>{formatTimeDisplay(workoutRoundTime)}</span>
          </div>
        </div>
      </div>
      <SocialDataDisplay
        plays={plays}
        id={id}
        isLiked={isLiked}
        isSaved={isSaved}
        likesCount={likesCount}
        savesCount={savesCount}
      />
    </div>
  );
}
