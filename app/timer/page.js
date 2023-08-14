"use client";

// styles
import styles from "./page.module.scss";

// react
import { useState, useCallback } from "react";

// utils
import getRandomCombo from "@/app/utils/getRandomCombo";

// components
import ComboCard from "@/app/components/ComboCard/ComboCard";
import Timer from "@/app/components/Timer/Timer";
import InitiateTimerForm from "./components/InitiateTimerForm/InitiateTimerForm";
import GenerateComboForm from "./components/GenerateComboForm/GenerateComboForm";

const Fight = () => {
  // init state
  const [randomCombo, setRandomCombo] = useState({});
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isNormalMode, setIsNormalMode] = useState(false);
  const [isRandomMode, setIsRandomMode] = useState(true);

  // Show form to initialise settings for Timer component
  if (!isTimerActive) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.pageTop}>
          <div className={styles.pageTopTextContainer}>
            <p>
              Start by generating a random combo, each rest round will automatically generate a new
              combo for you!
            </p>
            <p>Or simply press START to begin without automatic combo generation</p>
          </div>

          <div className={styles.formCardContainer}>
            <GenerateComboForm randomCombo={randomCombo} setRandomCombo={setRandomCombo} />
            {Object.keys(randomCombo).length === 0 ? (
              <div className={styles.comboSkeleton}>
                <div>?</div>
              </div>
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
};

export default Fight;
