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

export default function TimerPage() {
  // init state
  const [randomCombo, setRandomCombo] = useState<string[]>([]);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Show form to initialise settings for Timer component
  if (!isTimerActive) {
    return (
      <>
        <header>Timer</header>
        <div className={styles.wrapper}>
          <div className={styles.pageTop}>
            <div className={styles.pageTopTextContainer}>
              <p>
                Start by generating a random combo, each rest round will automatically generate a
                new combo for you!
              </p>
              <p>Or simply press play to begin without automatic combo generation</p>
            </div>
            <div className={styles.formCardContainer}>
              <GenerateComboForm setRandomCombo={setRandomCombo} />
              {randomCombo?.length === 0 ? (
                <div className={styles.comboSkeleton}>?</div>
              ) : (
                <ComboCard sequence={randomCombo} />
              )}
            </div>
          </div>
          <InitiateTimerForm setIsTimerActive={setIsTimerActive} randomCombo={randomCombo} />
        </div>
      </>
    );
  }

  // Show Timer
  return (
    <Timer
      setIsTimerActive={setIsTimerActive}
      sequence={randomCombo}
      setRandomCombo={setRandomCombo}
    />
  );
}
