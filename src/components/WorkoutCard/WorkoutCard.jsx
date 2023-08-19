"use client";

// styles
import styles from "./WorkoutCard.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

// icons
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";
import { GiPunchBlast } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const WorkoutCard = ({ id, title, workoutRounds, workoutRoundTime, createdBy }) => {
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
        <Link className={styles.workoutLink} href={`/workouts/workout/${id}`}>
          <button>INFO</button>
        </Link>
      </div>
      <div className={styles.createdByContainer}>
        {createdBy && <p className={styles.createdBy}>Created by {createdBy}</p>}
        <div className={styles.likesContainer}>
          {"0 "}
          <GiPunchBlast size={20} />
        </div>
      </div>

      <div className={styles.socialBtnContainer}>
        <button>
          <GiPunchBlast size={20} />
          Like
        </button>
        <button>
          <FaRegStar size={20} />
          Save
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
