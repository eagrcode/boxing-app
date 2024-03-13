"use client";

import styles from "./StartButton.module.scss";
import { FaPlay } from "react-icons/fa";

export default function StartButton({ handleStart }: { handleStart: () => void }) {
  return (
    <button onClick={handleStart} className={styles.btnStart}>
      <FaPlay size={15} /> Start
    </button>
  );
}
