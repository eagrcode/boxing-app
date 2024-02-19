import styles from "./WorkoutsFeed.module.scss";
import dynamic from "next/dynamic";
import PostSkeleton from "@/src/components/shared/PostSkeleton/PostSkeleton";
import { Workout } from "@/src/lib/types/workout.types";

const WithCustomLoading = dynamic(() => import("@/src/components/shared/WorkoutPost/WorkoutPost"), {
  loading: () => <PostSkeleton />,
});

export default function WorkoutsFeed({
  workouts,
  selectedIndex,
}: {
  workouts: Workout[];
  selectedIndex: number;
}) {
  return (
    <div className={styles.container}>
      {workouts?.map((workout, index) => (
        <WithCustomLoading
          key={workout.workout_data.id}
          index={index}
          selectedIndex={selectedIndex}
          id={workout.workout_data.id}
          title={workout.workout_data.title}
          description={workout.workout_data.description}
          workoutRounds={workout.workout_data.number_of_rounds}
          workoutWarmupTime={workout.workout_data.warmup_time}
          workoutRoundTime={workout.workout_data.round_time}
          workoutRestTime={workout.workout_data.rest_time}
          createdBy={workout.profiles_data.username || workout.profiles_data.email}
          createdAt={workout.workout_data.created_at}
          avatarURL={workout.profiles_data.avatar_url}
          plays={workout.workout_data.plays}
          name={workout.profiles_data.full_name}
          isLiked={workout.is_liked}
          isSaved={workout.is_saved}
          likesCount={workout.likes_count}
          savesCount={workout.saves_count}
        />
      ))}
    </div>
  );
}
