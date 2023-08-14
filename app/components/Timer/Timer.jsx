// styles
import styles from "./Timer.module.scss";

// react
import { useState, useEffect } from "react";

// libraries
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// components
import ComboCard from "../ComboCard/ComboCard";

// context
import { useFightData } from "@/app/context/useFightData";

const Timer = ({ setFightMode, randomCombo, setRandomCombo, handleGetRandomCombo }) => {
  // destructure context
  const {
    difficulty,
    rounds,
    setRounds,
    setRoundTime,
    roundTime,
    restTime,
    setRestTime,
    warmupTime,
    setWarmupTime,
    DEFAULT_ROUNDS,
    DEFAULT_ROUND_TIME,
    DEFAULT_REST_TIME,
    DEFAULT_WARMUP_TIME,
  } = useFightData();

  // init state
  const [currentRound, setCurrentRound] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(warmupTime);
  const [isFinished, setIsFinished] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [displayRound, setDisplayRound] = useState(1);

  // calculate total rounds & format round types
  const totalRounds = restTime ? rounds * 2 : rounds;
  const isWarmupRound = currentRound === 1;
  const isFightRound = currentRound > 1 && currentRound % 2 === 0;
  const isRestRound = restTime && currentRound > 1 && currentRound % 2 !== 0;

  // logs
  console.log("current round: ", currentRound);
  console.log("display round: ", displayRound);
  console.log("Warmup: ", isWarmupRound);
  console.log("Fight: ", isFightRound);
  console.log("Rest: ", isRestRound);

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

  // fetch random combo after each new round
  useEffect(() => {
    if (isRestRound) {
      handleGetRandomCombo(difficulty);
    }
  }, [isRestRound, handleGetRandomCombo, difficulty]);

  // change duration based on round type
  useEffect(() => {
    if (isFightRound) {
      setCurrentDuration(roundTime);
    } else if (isRestRound) {
      setCurrentDuration(restTime);
    }
  }, [isFightRound, isRestRound, setCurrentDuration, roundTime, restTime]);

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
    setRounds(DEFAULT_ROUNDS);
    setRoundTime(DEFAULT_ROUND_TIME);
    setRestTime(DEFAULT_REST_TIME);
    setWarmupTime(DEFAULT_WARMUP_TIME);
    setCurrentRound(1);
    setRandomCombo({});
    setFightMode(false);
  };

  return (
    <div className={styles.timer} aria-label="Timer">
      {isWarmupRound ? (
        <h1>WARMUP</h1>
      ) : (
        <h1>
          Round {displayRound} / {rounds}
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
            {isFinished ? (
              <p>DONE!</p>
            ) : isRestRound ? (
              <>
                {formatRemainingTime(remainingTime)}
                <p>Rest</p>
              </>
            ) : (
              <>
                {formatRemainingTime(remainingTime)}
                <p>Fight!</p>
              </>
            )}
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

      {randomCombo && (
        <ComboCard
          id={randomCombo._id}
          name={randomCombo.name}
          sequence={randomCombo.sequence}
          difficulty={randomCombo.difficulty}
        />
      )}
    </div>
  );
};

export default Timer;
