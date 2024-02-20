"use client";

import styles from "./Topbar.module.scss";
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";
import { useSearchParams } from "next/navigation";

export default function Topbar() {
  const { isTimerActive } = useTimerDataContext();
  const { isWorkoutMode } = useWorkoutTimerDataContext();

  const searchParams = useSearchParams();
  const timerMode = searchParams.get("timer_mode");

  if (timerMode === "active") {
    return null;
  }

  return (
    <div className={styles.topBar}>
      <Logo variant={"nav"} />
      <Avatar position={"topBar"} />
    </div>
  );
}
