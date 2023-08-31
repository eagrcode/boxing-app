// styles
import styles from "./UserSavedWorkouts.module.scss";

// components
import WorkoutCard from "@/src/components/WorkoutCard/WorkoutCard";

// utils

// react

export default async function UserSavedWorkouts({ savedWorkouts, userID }) {
  console.log("component data: ", savedWorkouts);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p>{`Saved Workouts (${savedWorkouts.length})`}</p>
      </div>

      {savedWorkouts && (
        <div className={styles.container}>
          {savedWorkouts?.map((save) => (
            <WorkoutCard
              key={save.workouts.id}
              id={save.workouts.id}
              title={save.workouts.title}
              workoutRounds={save.workouts.number_of_rounds}
              workoutRoundTime={save.workouts.round_time}
            />
          ))}
        </div>
      )}
    </div>
  );
}
