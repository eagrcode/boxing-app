// styles
import styles from "./UserWorkoutList.module.scss";

// next
import Link from "next/link";

// components
import UserWorkoutCard from "../UserWorkoutCard/UserWorkoutCard";

// utils
import getUserWorkouts from "@/src/utils/getUserWorkouts";

export const revalidate = 0;

export default async function UserWorkoutList({ userID }) {
  // get workouts
  const userWorkouts = await getUserWorkouts(userID);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p>{`My Workouts (${userWorkouts.length})`}</p>
        <Link href="/account/createWorkout">Create workout</Link>
      </div>

      {userWorkouts && (
        <div className={styles.container}>
          {userWorkouts.map((workout) => (
            <UserWorkoutCard
              key={workout.id}
              id={workout.id}
              title={workout.title}
              workoutRounds={workout.number_of_rounds}
              workoutRoundTime={workout.round_time}
              createdAt={workout.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
