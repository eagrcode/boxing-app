"use client";

import styles from "./Topbar.module.scss";
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";

export default function Topbar() {
  const { isTimerActive } = useTimerDataContext();
  const { isWorkoutMode } = useWorkoutTimerDataContext();

  if (isTimerActive) {
    return null;
  } else if (isWorkoutMode) {
    return null;
  }

  return (
    <div className={styles.topBar}>
      <Logo variant={"nav"} />
      <Avatar position={"topBar"} />
    </div>
  );
}
