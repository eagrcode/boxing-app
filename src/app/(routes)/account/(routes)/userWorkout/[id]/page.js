// utils
import getWorkoutById from "@/src/lib/services/getWorkoutById";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

// components
import UserWorkout from "@/src/components/ui/UserWorkout/UserWorkout";
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";

export const dynamic = "force-dynamic";

export default async function UserWorkoutPage({ params }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  const { data: user } = await supabase.auth.getUser();

  console.log(user.user);

  // fetch workout data
  const workoutData = await getWorkoutById(params.id);
  const likes = await getWorkoutLikes(params.id);

  return (
    <>
      <UserWorkout
        id={workoutData.id}
        userID={user?.user.id}
        likes={likes}
        title={workoutData.title}
        roundInfo={workoutData.round_info}
        workoutRounds={workoutData.number_of_rounds}
        workoutRoundTime={workoutData.round_time}
        workoutRestTime={workoutData.rest_time}
        workoutWarmupTime={workoutData.warmup_time}
        workoutData={workoutData}
        isPublic={workoutData.is_public}
      />
    </>
  );
}
