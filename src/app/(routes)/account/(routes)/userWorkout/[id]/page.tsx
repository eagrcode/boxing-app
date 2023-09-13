// utils
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import getWorkoutById from "@/src/lib/services/getWorkoutById";
import getWorkoutSaves from "@/src/lib/services/getWorkoutSaves";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

// components
import UserWorkout from "./UserWorkout/UserWorkout";

export const dynamic = "force-dynamic";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function UserWorkoutPage({ params }: WorkoutPageProps) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  // fetch data
  const likes = (await getWorkoutLikes(params.id)) || [];
  const saved = await getWorkoutSaves(params.id, userID);
  const workoutData = await getWorkoutById(params.id);

  return (
    <>
      <UserWorkout
        id={workoutData?.id}
        createdBy={workoutData?.profiles.username}
        title={workoutData?.title}
        description={workoutData?.description}
        workoutRounds={workoutData?.number_of_rounds}
        workoutRoundTime={workoutData?.round_time}
        workoutRestTime={workoutData?.rest_time}
        workoutWarmupTime={workoutData?.warmup_time}
        roundInfo={workoutData?.round_info}
        createdAt={workoutData?.created_at}
        data={workoutData}
        likes={likes}
        saved={saved}
        userID={userID || ""}
      />
    </>
  );
}
