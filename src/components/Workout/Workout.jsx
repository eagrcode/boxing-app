"use client";

// styles
import styles from "./Workout.module.scss";

// next

// context
import { useWorkoutMode } from "@/src/context/useWorkoutMode";

// components
import WorkoutTimer from "../../app/(pages)/workouts/components/WorkoutTimer/WorkoutTimer";
import LikeButton from "@/src/components/WorkoutCard/LikeButton/LikeButton";
import SaveButton from "@/src/components/WorkoutCard/SaveButton/SaveButton";

export default function Workout({
  id,
  title,
  numberOfRounds,
  roundTime,
  restTime,
  warmupTime,
  roundInfo,
  data,
  likes,
  saved,
  userID,
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
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <h1>{title}</h1>
        </div>
        <div className={styles.container}>
          <div>
            <h2>Info</h2>
            <p>Total {numberOfRounds * roundTime} min</p>
            <p>{numberOfRounds} rounds</p>
            <p>{warmupTime} sec / warmup</p>
            <p>{roundTime} min / round</p>
            <p>{restTime} sec / rest</p>
          </div>
        </div>
        <div className={styles.container}>
          <h2>Sequence</h2>
          {roundInfo.map((round, index) => (
            <div key={index}>
              <p>
                Round {round.round} - {round.sequence.map((seq) => `${seq} `)}
              </p>
            </div>
          ))}
        </div>
        <div className={`${styles.container} ${styles.socialContainer}`}>
          <LikeButton id={id} userID={userID} likes={likes} />
          <SaveButton id={id} userID={userID} saved={saved} />
        </div>
        <button onClick={handleStart} className={styles.startBtn}>
          Start
        </button>
      </div>
    );
  }

  if (isWorkoutMode) {
    return <WorkoutTimer />;
  }
}
