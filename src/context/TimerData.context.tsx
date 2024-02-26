"use client";

import { SetStateAction, createContext, useContext, useState, Dispatch, ReactNode } from "react";

interface FightDataContextType {
  difficulty: string;
  setDifficulty: Dispatch<SetStateAction<string>>;
  rounds: number;
  setRounds: Dispatch<SetStateAction<number>>;
  roundTime: number;
  setRoundTime: Dispatch<SetStateAction<number>>;
  restTime: number;
  setRestTime: Dispatch<SetStateAction<number>>;
  warmupTime: number;
  setWarmupTime: Dispatch<SetStateAction<number>>;
  DEFAULT_ROUNDS: number;
  DEFAULT_ROUND_TIME: number;
  DEFAULT_REST_TIME: number;
  DEFAULT_WARMUP_TIME: number;
  isTimerActive: boolean;
  setIsTimerActive: Dispatch<SetStateAction<boolean>>;
}

const FightDataContext = createContext<FightDataContextType | null>(null);

export const useTimerDataContext = (): FightDataContextType => {
  const context = useContext(FightDataContext);
  if (!context) {
    throw new Error("useFightData must be used within a FightDataProvider");
  }
  return context;
};

const DEFAULT_DIFFICULTY = "";
const DEFAULT_ROUNDS = 1;
const DEFAULT_ROUND_TIME = 60;
const DEFAULT_REST_TIME = 30;
const DEFAULT_WARMUP_TIME = 15;

export const FightDataProvider = ({ children }: { children: ReactNode }) => {
  // init state
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS);
  const [roundTime, setRoundTime] = useState(DEFAULT_ROUND_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const [warmupTime, setWarmupTime] = useState(DEFAULT_WARMUP_TIME);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

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
        isTimerActive,
        setIsTimerActive,
      }}
    >
      {children}
    </FightDataContext.Provider>
  );
};
