// styles
import styles from "./WorkoutCard.module.scss";

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
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";

export default async function WorkoutCard({
  id,
  title,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdBy,
  createdAt,
}) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  // call function and assign formatted value
  createdAt = formatTimeAgo(createdAt);

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + (workoutRestTime * workoutRounds) / 60
  );

  // fetch workout likes
  const likes = await getWorkoutLikes(id);
  const saved = await isWorkoutSaved(id, user?.id);

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
        <Link href={`/workout/${id}`}>{title}</Link>
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
        <SaveButton id={id} saved={saved} />
      </div>
      <LikesDisplay id={id} userID={user?.id} likes={likes} />
    </div>
  );
}
