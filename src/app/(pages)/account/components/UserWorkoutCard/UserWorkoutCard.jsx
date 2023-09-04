// styles
import styles from "./UserWorkoutCard.module.scss";

// components
import LikeButton from "@/src/components/WorkoutCard/LikeButton/LikeButton";
import LikesDisplay from "@/src/components/WorkoutCard/LikesDisplay/LikesDisplay";

// utils
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// icons
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";

export default async function UserWorkoutCard({
  id,
  title,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdAt,
}) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get user details
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // fetch likes for workout
  const likes = await getWorkoutLikes(id);

  // call function and assign formatted value
  createdAt = formatTimeAgo(createdAt);

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + (workoutRestTime * workoutRounds) / 60
  );

  // onClick={() => redirect(`/account/userWorkout/${id}`)}

  return (
    <div key={id} className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.usernameContainer}>
          <GiHighPunch size={20} />
          <p>eagrobinson</p>
        </div>
        <span>{createdAt}</span>
      </div>
      <h2>
        <Link href={`/account/userWorkout/${id}`}>{title}</Link>
      </h2>
      <div className={styles.overview}>
        <h3>Info</h3>
        <span>
          <RiTimerLine />
          {totalTime} mins
        </span>
        <span>
          {workoutRounds} round{workoutRounds > 1 && "s"}
        </span>
        <span>{workoutWarmupTime} sec / warmup</span>
        <span>{workoutRoundTime} sec / round</span>
        <span></span>
      </div>
      {/* <div className={styles.btnContainer}>
        <button className={styles.btnStart}>START</button>
        
      </div> */}
      <div className={styles.socialBtnContainer}>
        <LikeButton id={id} userID={user?.id} likes={likes} />
      </div>
      <LikesDisplay id={id} userID={user?.id} likes={likes} />
    </div>
  );
}
