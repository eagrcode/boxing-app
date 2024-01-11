import styles from "./WorkoutPost.module.scss";
import Link from "next/link";
import getWorkoutLikesCount from "@/src/lib/services/workout/getWorkoutLikes";
import isSavedByUser from "@/src/lib/services/user/isSavedByUser";
import isLikedByUser from "@/src/lib/services/user/isLikedByUser";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import getWorkoutSavesCount from "@/src/lib/services/workout/getWorkoutSaves";
import SocialDataDisplay from "@/src/components/shared/SocialDataDisplay/SocialDataDisplay";
import { MdOutlineTimer } from "react-icons/md";
import { BsLightningCharge, BsHourglassTop } from "react-icons/bs";
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
  name,
}: WorkoutPostPropTypes) {
  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  const likes = await getWorkoutLikesCount(id);
  const isLiked = await isLikedByUser(id, userID);
  const saved = await isSavedByUser(id, userID);
  const savesCount = await getWorkoutSavesCount(id);

  return (
    <div key={id} className={styles.card}>
      <Link className={styles.linkWrapper} href={`${variant}${id}`}>
        <div className={styles.cardTop}>
          <div className={styles.usernameContainer}>
            <div className={styles.avatar}>
              <div>{name?.charAt(0)}</div>
            </div>
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
      </Link>

      <SocialDataDisplay
        likes={likes}
        plays={plays}
        id={id}
        userID={userID}
        saved={saved}
        isLiked={isLiked}
        savesCount={savesCount}
      />
    </div>
  );
}
