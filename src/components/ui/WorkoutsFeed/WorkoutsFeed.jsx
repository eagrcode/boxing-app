// styles
import styles from "./WorkoutsFeed.module.scss";

// components
import WorkoutCard from "@/src/components/ui/WorkoutCard/WorkoutCard.jsx";

// utils
import getWorkouts from "@/src/lib/services/getWorkouts";

export default async function WorkoutsFeed() {
  // fetch workouts data
  const workouts = await getWorkouts();

  return (
    <div className={styles.container}>
      {workouts?.map((workout) => (
        <WorkoutCard
          key={workout.id}
          id={workout.id}
          title={workout.title}
          workoutRounds={workout.number_of_rounds}
          workoutRoundTime={workout.round_time}
          createdBy={workout.profiles.email}
          createdAt={workout.created_at}
        />
      ))}
    </div>
  );
}
