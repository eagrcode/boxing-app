// styles
import styles from "./UserWorkoutCard.module.scss";

// components
import LikeButton from "@/src/components/WorkoutCard/LikeButton/LikeButton";
import LikesDisplay from "@/src/components/WorkoutCard/LikesDisplay/LikesDisplay";

// utils
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";

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

  // format created_at response from db
  function timeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // Approximation
    const year = day * 365; // Approximation

    if (diffInSeconds < minute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < hour) {
      return `${Math.floor(diffInSeconds / minute)} m`;
    } else if (diffInSeconds < day) {
      return `${Math.floor(diffInSeconds / hour)} hr`;
    } else if (diffInSeconds < week) {
      return `${Math.floor(diffInSeconds / day)} d`;
    } else if (diffInSeconds < month) {
      return `${Math.floor(diffInSeconds / week)} weeks ago`;
    } else if (diffInSeconds < year) {
      return `${Math.floor(diffInSeconds / month)} months ago`;
    } else {
      return `${Math.floor(diffInSeconds / year)} years ago`;
    }
  }

  // call function and assign formatted value
  createdAt = createdAt && timeAgo(createdAt);

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
