// styles
import styles from "./WorkoutsFeed.module.scss";

// components
// import WorkoutPost from "@/src/components/ui/WorkoutPost/WorkoutPost";

// utils
import getWorkouts from "../getWorkouts";

import dynamic from "next/dynamic";
import PostSkeleton from "@/src/components/ui/PostSkeleton/PostSkeleton";

const WithCustomLoading = dynamic(() => import("@/src/components/ui/WorkoutPost/WorkoutPost"), {
  loading: () => <PostSkeleton />,
});

export default async function WorkoutsFeed({ userID }: { userID: string }) {
  // fetch workouts data
  const workouts = await getWorkouts();

  return (
    <div className={styles.container}>
      {workouts?.map((workout) => (
        <WithCustomLoading
          variant={"/workout/"}
          key={workout.id}
          id={workout.id}
          userID={userID}
          title={workout.title}
          description={workout.description}
          workoutRounds={workout.number_of_rounds}
          workoutWarmupTime={workout.warmup_time}
          workoutRoundTime={workout.round_time}
          workoutRestTime={workout.rest_time}
          createdBy={workout.profiles.username || workout.profiles.email}
          createdAt={workout.created_at}
          plays={workout.plays}
          name={workout.profiles.full_name}
        />
      ))}
    </div>
  );
}
