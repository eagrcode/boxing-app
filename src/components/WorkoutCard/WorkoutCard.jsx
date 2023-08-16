"use client";

// styles
import styles from "./WorkoutCard.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

const WorkoutCard = ({ id, title, workoutRounds, workoutRoundTime }) => {
  return (
    <Link href={`/workouts/workout/${id}`}>
      <div key={id} className={styles.card}>
        <div className={styles.cardTop}>
          <h1>{title}</h1>
          <p>
            Rounds: {workoutRounds} x {workoutRoundTime} min
          </p>
        </div>
        <div className={styles.roundsContainer}></div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
