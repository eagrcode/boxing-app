"use client";

import styles from "./Topbar.module.scss";
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";
import { useAppDispatch } from "@/src/redux/hooks";
import { useEffect } from "react";
import { setUserDetails } from "@/src/redux/userSlice";

type UserProps = {
  userID: string;
  fullName: string;
  email: string;
  avatarURL: string;
};

export default function Topbar({ userID, fullName, email, avatarURL }: UserProps) {
  console.log("TOPBAR: ", userID, fullName, email, avatarURL);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userID && fullName && email && avatarURL) {
      dispatch(setUserDetails({ userID, fullName, email, avatarURL }));
    }
  }, [userID, fullName, email, avatarURL]);

  const { isTimerActive } = useTimerDataContext();
  const { isWorkoutMode } = useWorkoutTimerDataContext();

  // console.log(user);

  if (isTimerActive) {
    return null;
  } else if (isWorkoutMode) {
    return null;
  }

  return (
    <div className={styles.topBar}>
      <Logo variant={"nav"} />
      <Avatar />
    </div>
  );
}
