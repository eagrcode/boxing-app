// styles
import styles from "./WorkoutPost.module.scss";

// next
import Link from "next/link";

// react

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// utils
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import isWorkoutSaved from "@/src/lib/services/isWorkoutSaved";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";

// components
import LikeButton from "@/src/components/buttons/LikeButton/LikeButton";
import SaveButton from "@/src/components/buttons/SaveButton/SaveButton";
import LikesDisplay from "@/src/components/ui/LikesDisplay/LikesDisplay";

// icons
import { GiHighPunch } from "react-icons/gi";

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
  console.log("POST: ", id, userID);
  // call function and assign formatted value
  createdAt = formatTimeAgo(createdAt);

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  console.log("TOTAL TIME: ", totalTime);

  // fetch workout likes
  const likes = await getWorkoutLikes(id);
  const saved = await isWorkoutSaved(id, userID);

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
        <Link href={variant === "home" ? `/workout/${id}` : `account/userWorkout/${id}`}>
          {title}
        </Link>
      </h2>
      <div className={styles.overview}>
        <p>{description}</p>
      </div>
      <div className={styles.info}>
        <span>{totalTime}mins</span>
        <span>
          {workoutRounds} round{workoutRounds > 1 && "s"}
        </span>
        {/* <span>{workoutWarmupTime} sec / warmup</span> */}
        <span>{workoutRoundTime}sec / round</span>
      </div>

      <div className={styles.socialBtnContainer}>
        <LikeButton id={id} userID={userID} likes={likes} />
        <SaveButton id={id} saved={saved} />
      </div>
      <LikesDisplay likes={likes} />

      {/* <div className={styles.btnContainer}>
        <button className={styles.btnStart}>START</button>
        
      </div> */}
    </div>
  );
}
