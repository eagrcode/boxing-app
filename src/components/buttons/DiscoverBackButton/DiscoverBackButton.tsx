"use client";

import { IoChevronForward } from "react-icons/io5";
import styles from "./DiscoverBackButton.module.scss";
import { useAppDispatch } from "@/src/redux/hooks";
import { setIsActive } from "@/src/redux/workoutSlice";

export default function DiscoverBackButton() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setIsActive());
  }

  return (
    <button className={styles.btn} onClick={() => handleClick()}>
      <IoChevronForward size={35} />
    </button>
  );
}
