"use client";

import { IoChevronBack } from "react-icons/io5";
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
      <IoChevronBack size={35} />
    </button>
  );
}
