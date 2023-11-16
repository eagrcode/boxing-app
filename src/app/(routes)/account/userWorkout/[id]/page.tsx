// export const dynamic = "force-dynamic";

import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import getWorkoutById from "@/src/lib/services/getWorkoutById";
import isSavedByUser from "@/src/lib/services/isSavedByUser";
import isLikedByUser from "@/src/lib/services/isLikedByUser";
import getWorkoutSavesCount from "@/src/lib/services/getWorkoutSaves";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UserWorkout from "@/src/components/profile/UserWorkout/UserWorkout";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function UserWorkoutPage({ params }: WorkoutPageProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    <>
      <UserWorkout
        id={workoutData?.id}
        createdBy={workoutData?.profiles.username || workoutData.profiles.email}
        title={workoutData?.title}
        description={workoutData?.description}
        workoutRounds={workoutData?.number_of_rounds}
        workoutRoundTime={workoutData?.round_time}
        workoutRestTime={workoutData?.rest_time}
        workoutWarmupTime={workoutData?.warmup_time}
        roundInfo={workoutData?.round_info}
        createdAt={workoutData?.created_at}
        likes={likes}
        isLiked={isLiked}
        saved={saved}
        savesCount={savesCount}
        userID={userID || ""}
        plays={workoutData?.plays}
        name={workoutData?.profiles.full_name}
      />
    </>
  );
}
