"use client";

import { createContext, useContext, useState } from "react";

const WorkoutModeContext = createContext();

export const useWorkoutMode = () => useContext(WorkoutModeContext);

export const WorkoutModeProvider = ({ children }) => {
  // init state
  const [isWorkoutMode, setIsWorkoutMode] = useState(false);
  const [workoutRounds, setWorkoutRounds] = useState(null);
  const [workoutRoundTime, setWorkoutRoundTime] = useState(null);
  const [workoutRestTime, setWorkoutRestTime] = useState(null);
  const [workoutWarmupTime, setWorkoutWarmupTime] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState({});

  return (
    <WorkoutModeContext.Provider
      value={{
        isWorkoutMode,
        setIsWorkoutMode,
        workoutRounds,
        setWorkoutRounds,
        workoutRoundTime,
        setWorkoutRoundTime,
        workoutRestTime,
        setWorkoutRestTime,
        workoutWarmupTime,
        setWorkoutWarmupTime,
        selectedWorkout,
        setSelectedWorkout,
      }}
    >
      {children}
    </WorkoutModeContext.Provider>
  );
};
