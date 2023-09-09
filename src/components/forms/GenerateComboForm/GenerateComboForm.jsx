import styles from "./GenerateComboForm.module.scss";

// context
import { useFightData } from "@/src/context/useFightData";

// utils
import getRandomCombo from "@/src/lib/services/getRandomCombo";

export default function GenerateComboForm({ setRandomCombo }) {
  // destructure context
  const { difficulty, setDifficulty } = useFightData();

  // assign difficulty selection
  const handleInputChange = (e) => {
    const { value } = e.target;
    setDifficulty(value);
  };

  // get random combo from db on click
  const handleGetRandomCombo = async (difficulty) => {
    const combo = await getRandomCombo(difficulty);
    setRandomCombo(combo);
  };

  // submit form and pass difficulty to parent
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetRandomCombo(difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="difficulty">Difficulty</label>
      <select id="difficulty" name="difficulty" onChange={handleInputChange} value={difficulty}>
        <option value="Beginner">Beginner</option>
        <option value="Amateur">Amateur</option>
        <option value="Pro">Pro</option>
      </select>
      <button type="submit">Generate</button>
    </form>
  );
}
