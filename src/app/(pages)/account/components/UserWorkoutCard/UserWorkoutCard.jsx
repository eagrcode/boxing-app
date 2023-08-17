"use client";

// styles
import styles from "./UserWorkoutCard.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

// icons
import { RiTimerLine } from "react-icons/ri";

export default function UserWorkoutCard({ id, title, workoutRounds, workoutRoundTime, createdBy }) {
  return (
    <Link className={styles.workoutLink} href={`/account/userWorkout/${id}`}>
      <div key={id} className={styles.card}>
        <div className={styles.cardTop}>
          <h2>{title}</h2>
          <p>
            <RiTimerLine /> {workoutRounds} x {workoutRoundTime} min
          </p>
        </div>
        {createdBy && <p className={styles.createdBy}>Created by {createdBy}</p>}
      </div>
    </Link>
  );
}
