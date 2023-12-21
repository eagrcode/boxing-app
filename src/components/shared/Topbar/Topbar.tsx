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

export default function Topbar() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (user) {
  //     const { id, full_name, email, avatar_url } = user;
  //     dispatch(setUserDetails({ id, full_name, email, avatar_url }));
  //   }
  // }, [user]);

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
      {/* <Avatar /> */}
    </div>
  );
}
