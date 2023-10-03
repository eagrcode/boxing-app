// styles
import styles from "./WorkoutPost.module.scss";

// next
import Link from "next/link";

// utils
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import isSavedByUser from "@/src/lib/services/isSavedByUser";
import isLikedByUser from "@/src/lib/services/isLikedByUser";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";

// components
import SocialDataDisplay from "@/src/components/ui/SocialDataDisplay/SocialDataDisplay";

// icons
import { GiHighPunch } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { BsLightningCharge, BsHourglassTop } from "react-icons/bs";

// types
import type { WorkoutPostPropTypes } from "./workoutPost.types";

export default async function WorkoutPost({
  variant,
  id,
  userID,
  title,
  description,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdBy,
  createdAt,
  plays,
}: WorkoutPostPropTypes) {
  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  // fetch workout likes
  const likes = await getWorkoutLikes(id);
  const isLiked = await isLikedByUser(id, userID);
  const saved = await isSavedByUser(id, userID);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.usernameContainer}>
          <GiHighPunch size={20} />
          <p>{createdBy}</p>
        </div>
        <span>{formatTimeAgo(createdAt)}</span>
      </div>
      <h2>
        <Link href={`${variant}${id}`}>{title}</Link>
      </h2>
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
          <span>
            {workoutRounds} round{workoutRounds > 1 && "s"}
          </span>
        </div>
        <div className={styles.infoDisplay}>
          <BsHourglassTop size={18} />
          <span>{formatTimeDisplay(workoutRoundTime)} / round</span>
        </div>
      </div>

      <SocialDataDisplay
        likes={likes}
        plays={plays}
        id={id}
        userID={userID}
        saved={saved}
        isLiked={isLiked}
      />
    </div>
  );
}
