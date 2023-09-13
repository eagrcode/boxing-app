// styles
import styles from "./UserSavedWorkouts.module.scss";

// components
import WorkoutPost from "@/src/components/ui/WorkoutPost/WorkoutPost";

// services
import getUserSavedWorkouts from "../getUserSavedWorkouts";

// react

export default async function UserSavedWorkouts({ userID }: { userID: string }) {
  const savedWorkouts = await getUserSavedWorkouts(userID);

  console.log("component data: ", savedWorkouts);

  return (
    <div className={styles.wrapper}>
      {savedWorkouts && (
        <div className={styles.container}>
          {savedWorkouts?.map((save) => (
            <WorkoutPost
              variant={"/workout/"}
              key={save.id}
              userID={userID}
              id={save.workouts.id}
              title={save.workouts.title}
              description={save.workouts.description}
              workoutRounds={save.workouts.number_of_rounds}
              workoutWarmupTime={save.workouts.warmup_time}
              workoutRoundTime={save.workouts.round_time}
              workoutRestTime={save.workouts.rest_time}
              createdAt={save.workouts.created_at}
              createdBy={save.profiles.username}
            />
          ))}
        </div>
      )}
    </div>
  );
}
