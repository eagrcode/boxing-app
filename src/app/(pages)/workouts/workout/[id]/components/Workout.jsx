"use client";

// styles
import styles from "./Workout.module.scss";

// next
import { useRouter } from "next/navigation";

// context
import { useWorkoutMode } from "@/src/context/useWorkoutMode";

// components
import WorkoutTimer from "../../../components/WorkoutTimer/WorkoutTimer";

export default function Workout({
  title,
  numberOfRounds,
  roundTime,
  restTime,
  warmupTime,
  roundInfo,
  data,
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

  // init router
  const router = useRouter();

  console.log(data);

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
        <h1>{title}</h1>
        <div className={styles.container}>
          <h2>Info</h2>
          <div>
            <p>Total {numberOfRounds * roundTime} min</p>
            <p>{numberOfRounds} rounds</p>
            <p>{warmupTime} sec / warmup</p>
            <p>{roundTime} min / round</p>
            <p>{restTime} sec / rest</p>
          </div>
        </div>
        <div className={styles.container}>
          <h2>Combos</h2>
          {roundInfo.map((round, index) => (
            <div key={index}>
              <p>
                Round {round.round} - {round.sequence.map((seq) => `${seq} `)}
              </p>
            </div>
          ))}
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
