import styles from "./GenerateComboForm.module.scss";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import getRandomCombo from "@/src/lib/services/timer/getRandomCombo";
import { Dispatch, SetStateAction, useState } from "react";

interface GenerateComboFormProps {
  setRandomCombo: Dispatch<SetStateAction<string[]>>;
}

export default function GenerateComboForm({ setRandomCombo }: GenerateComboFormProps) {
  // destructure context
  const { difficulty, setDifficulty } = useTimerDataContext();

  // assign difficulty selection
  const handleDifficultySelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    console.log(id);
    setDifficulty(id);
  };

  // get random combo from db on click
  const handleGetRandomCombo = async (difficulty: string) => {
    const combo = await getRandomCombo(difficulty);
    console.log(combo);
    setRandomCombo(combo);
  };

  // submit form and pass difficulty to parent
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleGetRandomCombo(difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.difficultySelectContainer}>
        <div
          id="Beginner"
          className={`${difficulty === "Beginner" && styles.active}`}
          onClick={(e) => handleDifficultySelect(e)}
        >
          Beginner
        </div>
        <div
          id="Amateur"
          className={`${difficulty === "Amateur" && styles.active}`}
          onClick={(e) => handleDifficultySelect(e)}
        >
          Amateur
        </div>
        <div
          id="Pro"
          className={`${difficulty === "Pro" && styles.active}`}
          onClick={(e) => handleDifficultySelect(e)}
        >
          Pro
        </div>
      </div>
      <button type="submit">Generate</button>
    </form>
  );
}
