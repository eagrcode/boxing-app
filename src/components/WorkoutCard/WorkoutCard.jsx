// styles
import styles from "./WorkoutCard.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// utils
import getWorkoutLikes from "@/src/utils/getWorkoutLikes";
import isWorkoutSaved from "@/src/utils/isWorkoutSaved";

// components
import LikeButton from "./LikeButton/LikeButton";
import SaveButton from "./SaveButton/SaveButton";
import LikesDisplay from "./LikesDisplay/LikesDisplay";

// icons
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";
import { GiPunchBlast } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default async function WorkoutCard({
  id,
  title,
  workoutRounds,
  workoutRoundTime,
  createdBy,
}) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  // fetch workout likes
  const likes = await getWorkoutLikes(id);
  const saved = await isWorkoutSaved(id, user?.id);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.titleContainer}>
          <GiHighPunch size={20} />
          <h2>{title}</h2>
        </div>
        <p>
          <RiTimerLine /> {workoutRounds} x {workoutRoundTime} min
        </p>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btnStart}>START</button>
        <Link className={styles.workoutLink} href={`/workouts/workout/${id}`}>
          <button>INFO</button>
        </Link>
      </div>
      <div className={styles.createdByContainer}>
        {createdBy && <p className={styles.createdBy}>Created by {createdBy}</p>}
        <LikesDisplay id={id} userID={user && user.id} likes={likes} />
      </div>

      <div className={styles.socialBtnContainer}>
        <LikeButton id={id} userID={user && user.id} likes={likes} />
        <SaveButton id={id} userID={user && user.id} saved={saved} />
      </div>
    </div>
  );
}
