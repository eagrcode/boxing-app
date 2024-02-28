"use client";

import styles from "./InitiateTimerForm.module.scss";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ComboCard from "../../shared/ComboCard/ComboCard";
import getRandomCombo from "@/src/lib/services/timer/getRandomCombo";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type PropTypes = {
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  randomCombo: string[];
  setRandomCombo: Dispatch<SetStateAction<string[]>>;
};

const STEP_1 = 1;
const STEP_2 = 2;
const STEP_3 = 3;

const InitiateTimerForm = ({ setShowInfo, randomCombo, setRandomCombo }: PropTypes) => {
  const [currentSelectedMode, setCurrentSelectedMode] = useState<string>("");
  const [currentError, setCurrentError] = useState<string | null>("");
  const [currentStep, setCurrentStep] = useState<number>(STEP_1);
  const {
    rounds,
    roundTime,
    restTime,
    warmupTime,
    setRounds,
    setRoundTime,
    setRestTime,
    setWarmupTime,
    difficulty,
    setDifficulty,
    setIsTimerActive,
  } = useTimerDataContext();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const formSteps = [
    {
      id: 1,
      name: "Timer mode",
      isSkippable: false,
      completed: false,
      errorMessage: "Please select a mode",
    },
    {
      id: 2,
      name: "Generate starting combo",
      isSkippable: true,
      completed: false,
      errorMessage: "Please generate your combo",
    },
    {
      id: 3,
      name: "Round configuration",
      isSkippable: false,
      completed: false,
      errorMessage: null,
    },
  ];

  // Define button disabled condition
  const isGenerateBtnDisabled = difficulty === "";
  const isNextBtnDisabled = !randomCombo.length;

  const handleBackClick = () => {
    if (currentSelectedMode === "TABATA") {
      setCurrentStep(STEP_1);
    }

    if (currentSelectedMode === "TABATA - ACG") {
      setCurrentStep((prev) => prev - STEP_1);
    }
  };

  // Step 1 - Mode select
  const handleModeSelect = (mode: string) => {
    setCurrentSelectedMode(mode);
    setCurrentError("");

    if (mode === "TABATA") {
      setRandomCombo([]);
      setDifficulty("");
      setCurrentStep(STEP_3); // Skip to step 3
    } else {
      setCurrentStep(STEP_2); // Go to step 2
    }
  };

  // Step 2 - ACG
  const handleDifficultySelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    setDifficulty(id);
  };
  //
  const handleGetRandomCombo = async () => {
    const combo = await getRandomCombo(difficulty);
    setRandomCombo(combo);
  };
  //
  const handleNextClick = () => {
    setCurrentError("");
    setCurrentStep(STEP_3);
  };

  // Step 3 - Round settings
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    switch (name) {
      case "rounds":
        setRounds(numericValue);
        break;
      case "roundTime":
        setRoundTime(numericValue);
        break;
      case "restTime":
        setRestTime(numericValue);
        break;
      case "warmup":
        setWarmupTime(numericValue);
        break;
    }
  };
  //
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    // setIsTimerActive(true);
    params.set("timer_mode", "active");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formTop}>
        <h1 className={styles.stepTitle}>{formSteps[currentStep - 1].name}</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {currentStep === 1 && (
          <>
            <div className={styles.modeSelectContainer}>
              <div className={styles.acgCard}>
                <h2 className={styles.modeHeading}>Interval - ACG</h2>

                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleModeSelect("TABATA - ACG")}
                >
                  Find combo
                </button>
              </div>

              <div className={styles.acgCard}>
                <h2 className={styles.modeHeading}>Interval - Standard</h2>

                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleModeSelect("TABATA")}
                >
                  Settings
                </button>
              </div>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className={styles.difficultySelectContainer}>
              <button
                type="button"
                id="Beginner"
                className={`${styles.btnSecondary} ${difficulty === "Beginner" && styles.active}`}
                onClick={(e) => handleDifficultySelect(e)}
              >
                Beginner
              </button>
              <button
                type="button"
                id="Amateur"
                className={`${styles.btnSecondary} ${difficulty === "Amateur" && styles.active}`}
                onClick={(e) => handleDifficultySelect(e)}
              >
                Amateur
              </button>
              <button
                type="button"
                id="Pro"
                className={`${styles.btnSecondary} ${difficulty === "Pro" && styles.active}`}
                onClick={(e) => handleDifficultySelect(e)}
              >
                Pro
              </button>
            </div>
            <button
              type="button"
              className={`${styles.btnSecondary} ${styles.btnGenerate} ${
                isGenerateBtnDisabled && styles.disabled
              }`}
              onClick={() => handleGetRandomCombo()}
              disabled={isGenerateBtnDisabled}
            >
              Generate
            </button>
            {randomCombo?.length === 0 ? (
              <div className={styles.comboSkeleton}></div>
            ) : (
              <ComboCard sequence={randomCombo} />
            )}
            <div className={styles.bottomBtnContainer}>
              <button
                onClick={() => handleBackClick()}
                type="button"
                className={`${styles.btnSecondary} ${styles.btnBack}`}
              >
                Back
                <div className={styles.backIcon}>
                  <IoIosArrowRoundBack size={25} />
                </div>
              </button>
              <button
                type="button"
                className={`${styles.btnPrimary} ${styles.btnNext} ${
                  isNextBtnDisabled && styles.disabled
                }`}
                onClick={() => handleNextClick()}
                disabled={isNextBtnDisabled}
              >
                Next
                <div className={styles.nextIcon}>
                  <IoIosArrowRoundForward size={25} />
                </div>
              </button>
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className={styles.rangeContainer}>
              <div className={styles.row}>
                <label htmlFor="rounds">Rounds {rounds}</label>
                <input
                  type="range"
                  id="rounds"
                  name="rounds"
                  min="1"
                  max="20"
                  step="1"
                  onChange={(e) => handleInputChange(e)}
                  value={rounds}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="roundTime">Round / {formatTimeDisplay(roundTime)}</label>
                <input
                  type="range"
                  id="roundTime"
                  name="roundTime"
                  min="60"
                  max="300"
                  step="10"
                  onChange={handleInputChange}
                  value={roundTime}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="restTime">Rest {formatTimeDisplay(restTime)}</label>
                <input
                  type="range"
                  id="restTime"
                  name="restTime"
                  min="30"
                  max="60"
                  step="5"
                  onChange={handleInputChange}
                  value={restTime}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="warmup">Warmup {formatTimeDisplay(warmupTime)}</label>
                <input
                  type="range"
                  id="warmup"
                  name="warmup"
                  min="15"
                  max="60"
                  step="15"
                  onChange={handleInputChange}
                  value={warmupTime}
                />
              </div>
            </div>
            <div className={styles.bottomBtnContainer}>
              <button
                onClick={() => handleBackClick()}
                type="button"
                className={`${styles.btnSecondary} ${styles.btnBack}`}
              >
                Back
                <div className={styles.backIcon}>
                  <IoIosArrowRoundBack size={25} />
                </div>
              </button>
              <button type="submit" className={`${styles.btnPrimary} ${styles.btnNext}`}>
                Start
                <div className={styles.nextIcon}>
                  <IoIosArrowRoundForward size={25} />
                </div>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default InitiateTimerForm;
