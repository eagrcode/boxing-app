import styles from "./GenerateComboForm.module.scss";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import getRandomCombo from "@/src/lib/services/getRandomCombo";
import { Dispatch, SetStateAction } from "react";

interface GenerateComboFormProps {
  setRandomCombo: Dispatch<SetStateAction<string[]>>;
}

export default function GenerateComboForm({ setRandomCombo }: GenerateComboFormProps) {
  // destructure context
  const { difficulty, setDifficulty } = useTimerDataContext();

  // assign difficulty selection
  const handleInputChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setDifficulty(value);
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
      {/* <label htmlFor="difficulty">Difficulty</label> */}
      <select id="difficulty" name="difficulty" onChange={handleInputChange} value={difficulty}>
        <option value="Beginner">Beginner</option>
        <option value="Amateur">Amateur</option>
        <option value="Pro">Pro</option>
      </select>
      <button type="submit">Generate</button>
    </form>
  );
}
