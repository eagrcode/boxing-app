"use client";

// styles
import styles from "./Workout.module.scss";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

// context
import { useWorkoutMode } from "@/src/context/useWorkoutMode";

// components
import WorkoutTimer from "@/src/components/timers/WorkoutTimer/WorkoutTimer";
import LikeButton from "@/src/components/buttons/LikeButton/LikeButton";
import LikesDisplay from "../LikesDisplay/LikesDisplay";
import SaveButton from "@/src/components/buttons/SaveButton/SaveButton";

// icons
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";

export default function Workout({
  id,
  userID,
  title,
  roundInfo,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdAt,
  workoutData,
  likes,
}) {
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

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + (workoutRestTime * workoutRounds) / 60
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
            <p>eagrobinson</p>
          </div>
          <span>{createdAt}</span>
        </div>
        <h2>
          <Link href={`/account/userWorkout/${id}`}>{title}</Link>
        </h2>
        <div className={styles.overview}>
          <h3>Info</h3>
          <span>
            <RiTimerLine />
            {totalTime} mins
          </span>
          <span>
            {workoutRounds} round{workoutRounds > 1 && "s"}
          </span>
          <span>{workoutWarmupTime} sec / warmup</span>
          <span>{workoutRoundTime} sec / round</span>
          <span></span>
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
          <LikesDisplay id={id} userID={userID} likes={likes} />
          <SaveButton />
        </div>
      </div>
    );
  }

  if (isWorkoutMode) {
    return <WorkoutTimer />;
  }
}
