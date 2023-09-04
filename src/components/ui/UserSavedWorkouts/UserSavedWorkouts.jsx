// styles
import styles from "./UserSavedWorkouts.module.scss";

// components
import WorkoutCard from "@/src/components/ui/WorkoutCard/WorkoutCard";

// utils

// react

export default async function UserSavedWorkouts({ savedWorkouts, userID }) {
  console.log("component data: ", savedWorkouts);

  return (
    <div className={styles.wrapper}>
      {savedWorkouts && (
        <div className={styles.container}>
          {savedWorkouts?.map((save) => (
            <WorkoutCard
              key={save.workouts.id}
              id={save.workouts.id}
              title={save.workouts.title}
              workoutRounds={save.workouts.number_of_rounds}
              workoutWarmupTime={save.workouts.warmup_time}
              workoutRoundTime={save.workouts.round_time}
              workoutRestTime={save.workouts.rest_time}
              createdAt={save.workouts.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
