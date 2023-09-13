"use client";

// styles
import styles from "./WorkoutTimer.module.scss";

// react
import { useState, useEffect } from "react";

// libraries
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// components
import ComboCard from "@/src/app/(routes)/timer/ComboCard/ComboCard";

// context
import { useWorkoutMode } from "@/src/context/useWorkoutMode";

const WorkoutTimer = () => {
  // destructure context
  const {
    setIsWorkoutMode,
    selectedWorkout,
    workoutRounds,
    workoutRoundTime,
    workoutRestTime,
    workoutWarmupTime,
  } = useWorkoutMode();

  console.log(selectedWorkout);

  // init state
  const [currentRound, setCurrentRound] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(workoutWarmupTime);
  const [isFinished, setIsFinished] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [displayRound, setDisplayRound] = useState(1);
  const [currentCombo, setCurrentCombo] = useState(0);

  // calculate total rounds & format round types
  const totalRounds = workoutRestTime ? workoutRounds * 2 : workoutRounds;
  const isWarmupRound = currentRound === 1;
  const isFightRound = currentRound > 1 && currentRound % 2 === 0;
  const isRestRound = workoutRestTime && currentRound > 1 && currentRound % 2 !== 0;

  // logs
  console.log("current round: ", currentRound);
  console.log("display round: ", displayRound);
  console.log("Warmup: ", isWarmupRound);
  console.log("Fight: ", isFightRound);
  console.log("Rest: ", isRestRound);

  // format display based on round type
  const renderTimerText = (remainingTime) => {
    switch (true) {
      case isWarmupRound:
        return (
          <>
            {formatRemainingTime(remainingTime)}
            <p>WARMUP</p>
          </>
        );
      case isFinished:
        return <p>DONE!</p>;
      case isRestRound:
        return (
          <>
            {formatRemainingTime(remainingTime)}
            <p>REST</p>
          </>
        );
      default:
        return (
          <>
            {formatRemainingTime(remainingTime)}
            <p>FIGHT!</p>
          </>
        );
    }
  };

  // format remaining time to 00:00
  const formatRemainingTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // format timer colors based on round type
  const timerColors = !isFightRound
    ? ["#050778", "#050778", "#050778"]
    : ["#cfa227", "#cfa227", "#cfa227"];

  // format button text
  const buttonText = isCountingDown ? "Pause" : "Resume";

  // change duration based on round type
  useEffect(() => {
    if (isFightRound) {
      setCurrentDuration(workoutRoundTime);
    } else if (isRestRound) {
      setCurrentDuration(workoutRestTime);
    }
  }, [isFightRound, isRestRound, setCurrentDuration, workoutRoundTime, workoutRestTime]);

  useEffect(() => {
    if (isRestRound) {
      setCurrentCombo((prev) => prev + 1);
    }
  }, [isRestRound, setCurrentCombo]);

  // increment display round from second round onwards
  useEffect(() => {
    if (currentRound > 3 && isFightRound) {
      setDisplayRound((prev) => prev + 1);
    }
  }, [currentRound, isFightRound, setDisplayRound]);

  // logic for end of rounds/workout
  const handleOnComplete = () => {
    if (currentRound < totalRounds) {
      setCurrentRound((prev) => prev + 1);
      return { shouldRepeat: true, delay: 0 };
    } else {
      setIsCountingDown(false);
      setIsFinished(true);
      return { shouldRepeat: false };
    }
  };

  // reset state to defaults and render form components again
  const handleCancel = () => {
    setIsCountingDown(false);
    setCurrentRound(1);
    setIsWorkoutMode(false);
  };

  return (
    <div className={styles.timer} aria-label="Timer">
      {isWarmupRound ? (
        <h1>WARMUP</h1>
      ) : (
        <h1>
          Round {displayRound} / {workoutRounds}
        </h1>
      )}
      <CountdownCircleTimer
        isPlaying={isCountingDown}
        duration={currentDuration}
        colors={timerColors}
        trailColor="#151515"
        trailStrokeWidth={8}
        rotation="counterclockwise"
        strokeWidth={10}
        size={318}
        onComplete={handleOnComplete}
      >
        {({ remainingTime }) => (
          <div role="timer" aria-live="assertive" className={styles.timeText}>
            {renderTimerText(remainingTime)}
          </div>
        )}
      </CountdownCircleTimer>
      <div className={styles.controls}>
        <button onClick={handleCancel}>
          <div>Cancel</div>
        </button>
        <button disabled={isFinished} onClick={() => setIsCountingDown((prev) => !prev)}>
          <div>{buttonText}</div>
        </button>
      </div>

      <ComboCard sequence={selectedWorkout.round_info[currentCombo].sequence} />
    </div>
  );
};

export default WorkoutTimer;
