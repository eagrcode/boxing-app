// styles
import styles from "./WorkoutPost.module.scss";

// next
import Link from "next/link";

// utils
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import getWorkoutSaves from "@/src/lib/services/getWorkoutSaves";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";

// components
import LikeButton from "@/src/components/buttons/LikeButton/LikeButton";
import SaveButton from "@/src/components/buttons/SaveButton/SaveButton";
import LikesDisplay from "@/src/components/ui/LikesDisplay/LikesDisplay";

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
}: WorkoutPostPropTypes) {
  // call function and assign formatted value
  createdAt = formatTimeAgo(createdAt);

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  // format the time in "00:00" format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  console.log(workoutRounds, workoutRoundTime, workoutRestTime, workoutWarmupTime);

  // fetch workout likes
  const likes = await getWorkoutLikes(id);
  const saved = await getWorkoutSaves(id, userID);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.usernameContainer}>
          <GiHighPunch size={20} />
          <p>{createdBy}</p>
        </div>
        <span>{createdAt}</span>
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
          <span>{formatTime(totalTime)}</span>
        </div>
        <div className={styles.infoDisplay}>
          <BsLightningCharge size={20} />
          <span>
            {workoutRounds} round{workoutRounds > 1 && "s"}
          </span>
        </div>
        <div className={styles.infoDisplay}>
          <BsHourglassTop size={20} />
          <span>{formatTime(workoutRoundTime)} / round</span>
        </div>
        {/* <span>{workoutWarmupTime} sec / warmup</span> */}
      </div>

      <div className={styles.socialBtnContainer}>
        <LikeButton id={id} userID={userID} likes={likes} />
        <SaveButton id={id} saved={saved} />
      </div>
      <LikesDisplay likes={likes} />
    </div>
  );
}
