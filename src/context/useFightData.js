"use client";

import { createContext, useContext, useState } from "react";

const FightDataContext = createContext();

export const useFightData = () => useContext(FightDataContext);

const DEFAULT_DIFFICULTY = "Beginner";
const DEFAULT_ROUNDS = 1;
const DEFAULT_ROUND_TIME = 3;
const DEFAULT_REST_TIME = 3;
const DEFAULT_WARMUP_TIME = 3;

export const FightDataProvider = ({ children }) => {
  // init state
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS);
  const [roundTime, setRoundTime] = useState(DEFAULT_ROUND_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const [warmupTime, setWarmupTime] = useState(DEFAULT_WARMUP_TIME);

  return (
    <FightDataContext.Provider
      value={{
        difficulty,
        setDifficulty,
        rounds,
        setRounds,
        roundTime,
        setRoundTime,
        restTime,
        setRestTime,
        warmupTime,
        setWarmupTime,
        DEFAULT_ROUNDS,
        DEFAULT_ROUND_TIME,
        DEFAULT_REST_TIME,
        DEFAULT_WARMUP_TIME,
      }}
    >
      {children}
    </FightDataContext.Provider>
  );
};
