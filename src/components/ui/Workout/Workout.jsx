"use client";

// styles
import styles from "./Workout.module.scss";

// next
import Link from "next/link";

// context
import { useWorkoutMode } from "@/src/context/useWorkoutMode";

// components
import WorkoutTimer from "@/src/components/timers/WorkoutTimer/WorkoutTimer";
import LikeButton from "@/src/components/buttons/LikeButton/LikeButton";
import LikesDisplay from "../LikesDisplay/LikesDisplay";
import SaveButton from "@/src/components/buttons/SaveButton/SaveButton";

// icons
import { GiHighPunch } from "react-icons/gi";

// utils
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";

export default function Workout({
  id,
  userID,
  title,
  description,
  roundInfo,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdAt,
  createdBy,
  data,
  saved,
  likes,
}) {
  console.log("COMPONENT DATA: ", data);
  // destructure context
  const {
    isWorkoutMode,
    setIsWorkoutMode,
    setWorkoutRounds,
    setWorkoutRoundTime,
    setWorkoutRestTime,
    setWorkoutWarmupTime,
    setSelectedWorkout,
  } = useWorkoutMode();

  // call function and assign formatted value
  createdAt = formatTimeAgo(createdAt);

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  // handle workout timer start
  const handleStart = () => {
    setSelectedWorkout(data);
    setWorkoutRounds(numberOfRounds);
    setWorkoutRoundTime(roundTime);
    setWorkoutRestTime(restTime);
    setWorkoutWarmupTime(warmupTime);
    setIsWorkoutMode(true);
  };

  if (!isWorkoutMode) {
    return (
      <div key={id} className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.usernameContainer}>
            <GiHighPunch size={20} />
            <p>{createdBy}</p>
          </div>
          <span>{createdAt}</span>
        </div>
        <h2>
          <Link href={`/account/userWorkout/${id}`}>{title}</Link>
        </h2>
        <div className={styles.overview}>
          <p>{description}</p>
        </div>
        <div className={styles.info}>
          <span>{totalTime}mins</span>
          <span>
            {workoutRounds} round{workoutRounds > 1 && "s"}
          </span>
          {/* <span>{workoutWarmupTime} sec / warmup</span> */}
          <span>{workoutRoundTime}sec / round</span>
        </div>
        <div className={styles.exerciseContainer}>
          <h3>Combo's</h3>
          <div className={styles.comboContainer}>
            {roundInfo.map((round, index) => (
              <span key={index}>
                Round {round.round} :{" "}
                {round.sequence.map((seq) => (seq.length > 1 ? `${seq} > ` : seq))}
              </span>
            ))}
          </div>
        </div>
        {/* <div className={styles.btnContainer}>
        <button className={styles.btnStart}>START</button>
        
      </div> */}
        <div className={styles.socialBtnContainer}>
          <LikeButton id={id} userID={userID} likes={likes} />
          <SaveButton id={id} saved={saved} />
        </div>
        <LikesDisplay id={id} userID={userID} likes={likes} />
      </div>
    );
  }

  if (isWorkoutMode) {
    return <WorkoutTimer />;
  }
}
