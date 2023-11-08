export const dynamic = "force-dynamic";

// styles
import styles from "./page.module.scss";

// utils
import getWorkoutById from "@/src/lib/services/getWorkoutById";
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import isSavedByUser from "@/src/lib/services/isSavedByUser";
import isLikedByUser from "@/src/lib/services/isLikedByUser";

// components
import Workout from "./Workout/Workout";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getWorkoutSavesCount from "@/src/lib/services/getWorkoutSaves";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let userID = "";

  if (user) {
    userID = user.id;
  }

  // fetch data
  const likes = await getWorkoutLikes(params.id);
  const isLiked = await isLikedByUser(params.id, userID);
  const saved = await isSavedByUser(params.id, userID);
  const workoutData = await getWorkoutById(params.id);
  const savesCount = await getWorkoutSavesCount(params.id);

  return (
    <div className={styles.wrapper}>
      <Workout
        id={workoutData?.id}
        createdBy={workoutData?.profiles.username || workoutData?.profiles.email}
        title={workoutData?.title}
        description={workoutData?.description}
        workoutRounds={workoutData?.number_of_rounds}
        workoutRoundTime={workoutData?.round_time}
        workoutRestTime={workoutData?.rest_time}
        workoutWarmupTime={workoutData?.warmup_time}
        roundInfo={workoutData?.round_info}
        createdAt={workoutData?.created_at}
        likes={likes}
        saved={saved}
        userID={userID || ""}
        isLiked={isLiked}
        plays={workoutData?.plays}
        savesCount={savesCount}
        name={workoutData.profiles.full_name}
      />
    </div>
  );
}
