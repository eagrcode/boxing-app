"use client";

// styles
import styles from "./page.module.scss";

// react
import { useState } from "react";

// components
import ComboCard from "./ComboCard/ComboCard";
import Timer from "./Timer/Timer";
import InitiateTimerForm from "./InitiateTimerForm/InitiateTimerForm";
import GenerateComboForm from "./GenerateComboForm/GenerateComboForm";

// icons
import { MdInfoOutline } from "react-icons/md";
import { useTimerDataContext } from "@/src/context/TimerData.context";

export default function TimerPage() {
  // init state
  const [randomCombo, setRandomCombo] = useState<string[]>([]);

  const { isTimerActive, setIsTimerActive } = useTimerDataContext();

  // Show form to initialise settings for Timer component
  if (!isTimerActive) {
    return (
      <div className={styles.wrapper}>
        {/* <div className={styles.infoIcon}>
          <MdInfoOutline size={25} />
        </div> */}
        <header>Timer</header>
        <div className={styles.pageTop}>
          <div className={styles.formCardContainer}>
            <GenerateComboForm setRandomCombo={setRandomCombo} />
            {randomCombo?.length === 0 ? (
              <div className={styles.comboSkeleton}></div>
            ) : (
              <ComboCard sequence={randomCombo} />
            )}
          </div>
        </div>
        <InitiateTimerForm setIsTimerActive={setIsTimerActive} randomCombo={randomCombo} />
      </div>
    );
  }

  // Show Timer
  return (
    <div className={styles.timerWrapper}>
      <Timer
        setIsTimerActive={setIsTimerActive}
        sequence={randomCombo}
        setRandomCombo={setRandomCombo}
      />
    </div>
  );
}
