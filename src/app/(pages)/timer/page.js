"use client";

// styles
import styles from "./page.module.scss";

// react
import { useState, useCallback } from "react";

// components
import ComboCard from "@/src/components/ui/ComboCard/ComboCard";
import Timer from "@/src/components/timers/Timer/Timer";
import InitiateTimerForm from "@/src/components/forms/InitiateTimerForm/InitiateTimerForm";
import GenerateComboForm from "@/src/components/forms/GenerateComboForm/GenerateComboForm";

// icons
import { FaQuestion } from "react-icons/fa6";

export default function TimerPage() {
  // init state
  const [randomCombo, setRandomCombo] = useState({});
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Show form to initialise settings for Timer component
  if (!isTimerActive) {
    return (
      <>
        <header>Timer</header>
        <div className={styles.wrapper}>
          <div className={styles.pageTop}>
            {/* <div className={styles.pageTopTextContainer}>
              <p>
                Start by generating a random combo, each rest round will automatically generate a
                new combo for you!
              </p>
              <p>Or simply press START to begin without automatic combo generation</p>
            </div> */}

            <div className={styles.formCardContainer}>
              <GenerateComboForm randomCombo={randomCombo} setRandomCombo={setRandomCombo} />
              {Object.keys(randomCombo).length === 0 ? (
                <div className={styles.comboSkeleton}>?</div>
              ) : (
                <ComboCard
                  id={randomCombo._id}
                  name={randomCombo.name}
                  sequence={randomCombo.sequence}
                  difficulty={randomCombo.difficulty}
                />
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
      randomCombo={randomCombo}
      setRandomCombo={setRandomCombo}
    />
  );
}
