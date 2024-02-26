import styles from "./InitiateTimerForm.module.scss";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { FaPlay } from "react-icons/fa";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ComboCard from "../../shared/ComboCard/ComboCard";
import getRandomCombo from "@/src/lib/services/timer/getRandomCombo";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";

type PropTypes = {
  setShowInfo: Dispatch<SetStateAction<boolean>>;
};

const InitiateTimerForm = ({ setShowInfo }: PropTypes) => {
  const [currentSelectedMode, setCurrentSelectedMode] = useState<string>("");
  const [randomCombo, setRandomCombo] = useState<string[]>([]);
  const [currentError, setCurrentError] = useState<string | null>("");
  const { difficulty, setDifficulty, setIsTimerActive } = useTimerDataContext();

  const stepsConfig = [
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

  const [formSteps, setFormSteps] = useState(stepsConfig);
  const [currentStep, setCurrentStep] = useState<number>(formSteps[0].id);

  const isSkippable = !!formSteps.find((step) => step.isSkippable === true);

  const isGenerateBtnDisabled = difficulty === "";
  const isNextBtnDisabled = !randomCombo.length;

  // destructure context
  const {
    rounds,
    roundTime,
    restTime,
    warmupTime,
    setRounds,
    setRoundTime,
    setRestTime,
    setWarmupTime,
  } = useTimerDataContext();

  // const handleStepChange = (nextStepId: number) => {
  //   setCurrentError("");

  //   const currentStepIndex = formSteps.findIndex((step) => step.id === currentStep);
  //   const nextStepIndex = formSteps.findIndex((step) => step.id === nextStepId);

  //   if (currentSelectedMode === "TABATA" && formSteps[nextStepIndex].isSkippable) {
  //     setCurrentError("Please select TABATA - ACG mode first");
  //     return;
  //   }

  //   if (
  //     currentStep === 2 &&
  //     nextStepId === 3 &&
  //     !formSteps[currentStepIndex].completed &&
  //     randomCombo.length
  //   ) {
  //     setCurrentError("Please press next");
  //     return;
  //   }

  //   if (nextStepId < currentStep || formSteps[nextStepIndex].completed) {
  //     // Proceed if moving back or to a completed step
  //     setCurrentStep(nextStepId);
  //   } else if (!formSteps[currentStepIndex].completed) {
  //     // If trying to move forward without completing the current step, show an error
  //     setCurrentError(formSteps[currentStepIndex].errorMessage);
  //   } else {
  //     // If the current step is completed, simply move to the next step
  //     setCurrentStep(nextStepId);
  //   }
  // };

  const handleBackClick = () => {
    if (currentSelectedMode === "TABATA") {
      setCurrentStep((prev) => prev - 2);
    }

    if (currentSelectedMode === "TABATA - ACG") {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAcgSelect = (mode: string) => {
    setCurrentError("");
    setCurrentSelectedMode(mode);

    setFormSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === currentStep ? { ...step, completed: true } : step))
    );

    setCurrentStep((prev) => prev + 1);
  };

  const handleTabataSelect = (mode: string) => {
    setCurrentError("");
    setCurrentSelectedMode(mode);
    setRandomCombo([]);
    setDifficulty("");

    // setFormSteps((prevSteps) =>
    //   prevSteps.map((step) => (step.isSkippable ? { ...step, completed: false } : step))
    // );

    // setFormSteps((prevSteps) =>
    //   prevSteps.map((step) => (step.id === currentStep ? { ...step, completed: true } : step))
    // );

    setCurrentStep((prev) => prev + 2);
  };

  const handleNextClick = () => {
    setCurrentError("");
    setFormSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === currentStep ? { ...step, completed: true } : step))
    );
    setCurrentStep((prev) => prev + 1);
  };

  const handleDifficultySelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    console.log(id);
    setDifficulty(id);
  };

  const handleGetRandomCombo = async (difficulty: string) => {
    const combo = await getRandomCombo(difficulty);
    console.log(combo);
    setRandomCombo(combo);
  };

  const generateCombo = () => {
    if (currentError !== "") {
      setCurrentError("");
    }
    handleGetRandomCombo(difficulty);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (name === "rounds") {
      setRounds(numericValue);
      console.log(numericValue);
    } else if (name === "roundTime") {
      setRoundTime(numericValue);
      console.log(numericValue);
    } else if (name === "restTime") {
      setRestTime(numericValue);
      console.log(numericValue);
    } else if (name === "warmup") {
      setWarmupTime(numericValue);
      console.log(numericValue);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    setIsTimerActive(true);
  };

  return (
    <div className={styles.formWrapper}>
      {/* <div className={styles.stepContainer}>
        {formSteps.map((step, index) => (
          <>
            <button
              onClick={() => handleStepChange(step.id)}
              key={index}
              className={`${styles.step} ${step.id === currentStep && styles.active} ${
                step.completed && styles.completed
              }`}
              disabled={!step.completed}
            >
              <span className={styles.stepId}>{step.id}</span>
              <span className={styles.stepName}>{step.name}</span>
            </button>
            <div
              className={`${styles.stepProgress} ${
                currentSelectedMode === "TABATA" || step.completed ? styles.completed : ""
              }`}
            ></div>
          </>
        ))}
        {currentError && <p className={styles.error}>{currentError}</p>}
      </div> */}
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
                  onClick={() => handleAcgSelect("TABATA - ACG")}
                >
                  Find combo
                </button>
              </div>

              <div className={styles.acgCard}>
                <h2 className={styles.modeHeading}>Interval - Standard</h2>

                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleTabataSelect("TABATA")}
                >
                  TABATA
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
              onClick={generateCombo}
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
