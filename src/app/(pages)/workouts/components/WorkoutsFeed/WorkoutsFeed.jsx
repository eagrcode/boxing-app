// styles
import styles from "./WorkoutsFeed.module.scss";

// components
import WorkoutCard from "@/src/components/WorkoutCard/WorkoutCard.jsx";
import { SavedContextProvider } from "@/src/context/useSaveContext";

// utils
import getWorkouts from "@/src/utils/getWorkouts";

export default async function WorkoutsFeed() {
  // fetch workouts data
  const workouts = await getWorkouts();

  return (
    <SavedContextProvider>
      <div className={styles.container}>
        {workouts?.map((workout) => (
          <WorkoutCard
            key={workout.id}
            id={workout.id}
            title={workout.title}
            workoutRounds={workout.number_of_rounds}
            workoutRoundTime={workout.round_time}
            createdBy={workout.profiles.email}
          />
        ))}
      </div>
    </SavedContextProvider>
  );
}
