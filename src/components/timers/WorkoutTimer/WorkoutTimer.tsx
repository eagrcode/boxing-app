"use client";

import styles from "./WorkoutTimer.module.scss";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ComboCard from "../../shared/ComboCard/ComboCard";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";

const WorkoutTimer = ({
  setIsWorkoutMode,
  id,
  isMuted,
}: {
  setIsWorkoutMode: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  isMuted: boolean;
}) => {
  // destructure context
  const { roundInfo, workoutRounds, workoutRoundTime, workoutRestTime, workoutWarmupTime } =
    useWorkoutTimerDataContext();

  // init state
  const [currentRound, setCurrentRound] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(workoutWarmupTime);
  const [isFinished, setIsFinished] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [displayRound, setDisplayRound] = useState(1);
  const [currentCombo, setCurrentCombo] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);

  // refs
  const audioRefBellSingle = useRef<HTMLAudioElement | null>(null);
  const audioRefBell = useRef<HTMLAudioElement | null>(null);

  // calculate total rounds & format round types
  const totalRounds = useMemo(() => workoutRounds * 2, [workoutRounds]);
  const isWarmupRound = useMemo(() => currentRound === 1, [currentRound]);
  const isFightRound = useMemo(() => currentRound > 1 && currentRound % 2 === 0, [currentRound]);
  const isRestRound = useMemo(() => currentRound > 1 && currentRound % 2 !== 0, [currentRound]);

  // format display based on round type
  const renderTimerText = (remainingTime: number) => {
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
  const formatRemainingTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // format timer colors based on round type
  const timerColors: any = !isFightRound
    ? [["#050778"], ["#050778"], ["#050778"]]
    : [["#cfa227"], ["#cfa227"], ["#cfa227"]];

  // format button text
  const buttonText = isCountingDown ? "Pause" : "Resume";

  // Mute or unmute audio based on the isMuted prop
  useEffect(() => {
    audioRefBellSingle.current && (audioRefBellSingle.current.muted = isMuted);
    audioRefBell.current && (audioRefBell.current.muted = isMuted);
  }, [isMuted]);

  // change duration based on round type
  useEffect(() => {
    if (isFightRound) {
      setCurrentDuration(workoutRoundTime);
    } else if (isRestRound) {
      setCurrentDuration(workoutRestTime);
    }
  }, [isFightRound, isRestRound, workoutRoundTime, workoutRestTime, setCurrentDuration]);

  // change to next round combo when rest round
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

  // end of rounds/workout
  const handleOnComplete = useCallback(() => {
    if (currentRound < totalRounds) {
      if (currentRound % 2 === 0) {
        audioRefBell.current?.play();
      } else {
        audioRefBellSingle.current?.play();
      }
      setCurrentRound((prev) => prev + 1);
      setTimerKey((prev) => prev + 1);
      return { shouldRepeat: true, delay: 0 };
    } else {
      setIsCountingDown(false);
      setIsFinished(true);
      return { shouldRepeat: false };
    }
  }, [currentRound, totalRounds]);

  // reset state to defaults and render form components again
  const handleCancel = useCallback(() => {
    setIsCountingDown(false);
    setCurrentRound(1);
    setIsWorkoutMode(false);
  }, [setIsWorkoutMode, setCurrentRound, setIsCountingDown]);

  return (
    <>
      <div className={styles.timer} aria-label="Timer">
        {isWarmupRound ? (
          <h1>WARMUP</h1>
        ) : (
          <h1>
            Round {displayRound} / {workoutRounds}
          </h1>
        )}
        <CountdownCircleTimer
          key={timerKey}
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
          {({ remainingTime }) => {
            setTimeout(() => {
              if (isFightRound && remainingTime === 4) {
                audioRefBell.current?.play();
              } else if (remainingTime === 4) {
                audioRefBellSingle.current?.play();
              }
            }, 580);

            return (
              <div role="timer" aria-live="assertive" className={styles.timeText}>
                {renderTimerText(remainingTime)}
              </div>
            );
          }}
        </CountdownCircleTimer>
        <div className={styles.controls}>
          <button
            className={`${styles.btnCancel} ${isCountingDown && styles.btnCancelDisabled}`}
            disabled={isCountingDown}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={
              isWarmupRound || isRestRound ? `${styles.btnToggleBlue}` : `${styles.btnToggleOrange}`
            }
            disabled={isFinished}
            onClick={() => setIsCountingDown((prev) => !prev)}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <ComboCard sequence={roundInfo.round_info[currentCombo].sequence} />
      <audio preload="none" ref={audioRefBellSingle} src="/assets/audio/321bellSingle.mp3" />
      <audio preload="none" ref={audioRefBell} src="/assets/audio/321bell.mp3" />
    </>
  );
};

export default WorkoutTimer;
