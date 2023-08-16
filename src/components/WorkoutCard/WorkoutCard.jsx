"use client";

// styles
import styles from "./WorkoutCard.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

// icons
import { RiTimerLine } from "react-icons/ri";

const WorkoutCard = ({ id, title, workoutRounds, workoutRoundTime, createdBy }) => {
  return (
    <Link className={styles.workoutLink} href={`/workouts/workout/${id}`}>
      <div key={id} className={styles.card}>
        <div className={styles.cardTop}>
          <h2>{title}</h2>
          <p>
            <RiTimerLine /> {workoutRounds} x {workoutRoundTime} min
          </p>
        </div>
        <p className={styles.createdBy}>Created by {createdBy}</p>
      </div>
    </Link>
  );
};

export default WorkoutCard;
