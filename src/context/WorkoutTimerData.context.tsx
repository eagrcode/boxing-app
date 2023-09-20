"use client";

import { createContext, useContext, useState } from "react";

interface RoundInfo {
  sequence: string[];
}

interface SelectedWorkoutType {
  round_info: RoundInfo[];
}

interface WorkoutTimerDataContextType {
  workoutRounds: number;
  setWorkoutRounds: React.Dispatch<React.SetStateAction<number>>;
  workoutRoundTime: number;
  setWorkoutRoundTime: React.Dispatch<React.SetStateAction<number>>;
  workoutRestTime: number;
  setWorkoutRestTime: React.Dispatch<React.SetStateAction<number>>;
  workoutWarmupTime: number;
  setWorkoutWarmupTime: React.Dispatch<React.SetStateAction<number>>;
  roundInfo: SelectedWorkoutType;
  setRoundInfo: React.Dispatch<React.SetStateAction<SelectedWorkoutType>>;
  isWorkoutMode: boolean;
  setIsWorkoutMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutTimerDataContext = createContext<WorkoutTimerDataContextType | undefined>(undefined);

export const useWorkoutTimerDataContext = (): WorkoutTimerDataContextType => {
  const context = useContext(WorkoutTimerDataContext);
  if (!context) {
    throw new Error("useFightData must be used within a FightDataProvider");
  }
  return context;
};

export const WorkoutModeProvider = ({ children }: { children: React.ReactNode }) => {
  // init state
  const [workoutRounds, setWorkoutRounds] = useState(0);
  const [workoutRoundTime, setWorkoutRoundTime] = useState(0);
  const [workoutRestTime, setWorkoutRestTime] = useState(0);
  const [workoutWarmupTime, setWorkoutWarmupTime] = useState(0);
  const [roundInfo, setRoundInfo] = useState<SelectedWorkoutType>({ round_info: [] });
  const [isWorkoutMode, setIsWorkoutMode] = useState<boolean>(false);

  return (
    <WorkoutTimerDataContext.Provider
      value={{
        workoutRounds,
        setWorkoutRounds,
        workoutRoundTime,
        setWorkoutRoundTime,
        workoutRestTime,
        setWorkoutRestTime,
        workoutWarmupTime,
        setWorkoutWarmupTime,
        roundInfo,
        setRoundInfo,
        isWorkoutMode,
        setIsWorkoutMode,
      }}
    >
      {children}
    </WorkoutTimerDataContext.Provider>
  );
};
