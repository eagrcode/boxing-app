import styles from "./Timer.module.scss";
import { useState, useEffect, Dispatch, SetStateAction, useMemo, useCallback, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ComboCard from "../ComboCard/ComboCard";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import getRandomCombo from "../getRandomCombo";
import React from "react";

interface TimerProps {
  setIsTimerActive: Dispatch<SetStateAction<boolean>>;
  sequence: string[];
  setRandomCombo: Dispatch<SetStateAction<string[]>>;
  isMuted: boolean;
}

export default function Timer({ setIsTimerActive, sequence, setRandomCombo, isMuted }: TimerProps) {
  // context
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
  } = useTimerDataContext();

  // init state
  const [currentDuration, setCurrentDuration] = useState<number>(warmupTime);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(true);
  const [displayRound, setDisplayRound] = useState<number>(1);
  const [timerKey, setTimerKey] = useState<number>(0);

  // refs
  const audioRefBellSingle = useRef<HTMLAudioElement | null>(null);
  const audioRefBell = useRef<HTMLAudioElement | null>(null);

  // calculate total rounds & format round types
  const totalRounds = useMemo(() => rounds * 2, [rounds]);
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

  // toggle mute audio
  useEffect(() => {
    audioRefBellSingle.current && (audioRefBellSingle.current.muted = isMuted);
    audioRefBell.current && (audioRefBell.current.muted = isMuted);
  }, [isMuted]);

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

  // fetch random combo after each new round
  useEffect(() => {
    const fetchRandomCombo = async () => {
      const combo = await getRandomCombo(difficulty);
      setRandomCombo(combo);
    };

    if (sequence.length > 0 && isRestRound) {
      fetchRandomCombo();
    }
  }, [isRestRound, difficulty, sequence.length, setRandomCombo]);

  // logic for end of rounds/workout
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
      audioRefBell.current?.play();

      setIsCountingDown(false);
      setIsFinished(true);
      return { shouldRepeat: false };
    }
  }, [currentRound, totalRounds]);

  // reset state to defaults and render form components again
  const handleCancel = useCallback(() => {
    setRounds(DEFAULT_ROUNDS);
    setRoundTime(DEFAULT_ROUND_TIME);
    setRestTime(DEFAULT_REST_TIME);
    setWarmupTime(DEFAULT_WARMUP_TIME);
    setCurrentRound(1);
    setRandomCombo([]);
    setIsTimerActive(false);
  }, [
    setRounds,
    setRoundTime,
    setRestTime,
    setWarmupTime,
    setCurrentRound,
    setRandomCombo,
    setIsTimerActive,
    DEFAULT_ROUNDS,
    DEFAULT_ROUND_TIME,
    DEFAULT_REST_TIME,
    DEFAULT_WARMUP_TIME,
  ]);

  return (
    <>
      <div className={styles.timer} aria-label="Timer">
        {isWarmupRound ? (
          <h1>WARMUP</h1>
        ) : (
          <h1>
            Round {displayRound} / {rounds}
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
      {sequence.length > 0 && <ComboCard sequence={sequence} />}

      <audio preload="none" ref={audioRefBellSingle} src="/assets/audio/321bellSingle.mp3" />
      <audio preload="none" ref={audioRefBell} src="/assets/audio/321bell.mp3" />
    </>
  );
}
