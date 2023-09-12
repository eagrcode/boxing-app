"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FightDataContextType {
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  rounds: number;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
  roundTime: number;
  setRoundTime: React.Dispatch<React.SetStateAction<number>>;
  restTime: number;
  setRestTime: React.Dispatch<React.SetStateAction<number>>;
  warmupTime: number;
  setWarmupTime: React.Dispatch<React.SetStateAction<number>>;
  DEFAULT_ROUNDS: number;
  DEFAULT_ROUND_TIME: number;
  DEFAULT_REST_TIME: number;
  DEFAULT_WARMUP_TIME: number;
}

const FightDataContext = createContext<FightDataContextType | null>(null);

export const useTimerDataContext = (): FightDataContextType => {
  const context = useContext(FightDataContext);
  if (!context) {
    throw new Error("useFightData must be used within a FightDataProvider");
  }
  return context;
};

const DEFAULT_DIFFICULTY = "Beginner";
const DEFAULT_ROUNDS = 1;
const DEFAULT_ROUND_TIME = 3;
const DEFAULT_REST_TIME = 3;
const DEFAULT_WARMUP_TIME = 3;

export const FightDataProvider = ({ children }: { children: React.ReactNode }) => {
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
