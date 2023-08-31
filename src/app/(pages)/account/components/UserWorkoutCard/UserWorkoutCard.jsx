"use client";

// styles
import styles from "./UserWorkoutCard.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

// icons
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";

export default function UserWorkoutCard({ id, title, workoutRounds, workoutRoundTime, createdAt }) {
  console.log(workoutRounds, workoutRoundTime);
  // format created_at response from db
  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const day = ("0" + date.getDate()).slice(-2); // ensures 2 digits
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // ensures 2 digits, +1 because months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // call function and assign formatted value
  createdAt = createdAt && formatDate(createdAt);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.titleContainer}>
          <GiHighPunch size={20} />
          <h2>{title}</h2>
        </div>
        <p>
          <RiTimerLine /> {workoutRounds} x {workoutRoundTime} min
        </p>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btnStart}>START</button>
        <Link className={styles.workoutLink} href={`/account/userWorkout/${id}`}>
          <button>INFO</button>
        </Link>
      </div>
      <div className={styles.createdByContainer}>
        {<p className={styles.createdAt}>Created by {createdAt}</p>}
      </div>

      <div className={styles.socialBtnContainer}></div>
    </div>
  );
}
