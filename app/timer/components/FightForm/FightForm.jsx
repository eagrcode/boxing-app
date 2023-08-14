// styles
import styles from "./FightForm.module.scss";

// context
import { useFightData } from "@/app/context/useFightData";

const FightForm = ({ setFightMode, randomCombo }) => {
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
  } = useFightData();

  // Function to format the time in "00:00" format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // handle input onChange values
  const handleInputChange = (e) => {
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

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (randomCombo.length < 1) {
      alert("Please generate a random combo first!");
    } else {
      setFightMode(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.selectContainer}>
        <div>
          <label htmlFor="rounds">Rounds: {rounds}</label>
          <input
            type="range"
            id="rounds"
            name="rounds"
            min="1"
            max="30"
            step="1"
            onChange={handleInputChange}
            value={rounds}
          />
        </div>
        <div>
          <label htmlFor="roundTime">Round Time: {formatTime(roundTime)}</label>
          <input
            type="range"
            id="roundTime"
            name="roundTime"
            min="5"
            max="300"
            step="10"
            onChange={handleInputChange}
            value={roundTime}
          />
        </div>
        <div>
          <label htmlFor="restTime">Rest Time: {formatTime(restTime)}</label>
          <input
            type="range"
            id="restTime"
            name="restTime"
            min="0"
            max="60"
            step="5"
            onChange={handleInputChange}
            value={restTime}
          />
        </div>
        <div>
          <label htmlFor="warmup">Warmup: {formatTime(warmupTime)}</label>
          <input
            type="range"
            id="warmup"
            name="warmup"
            min="10"
            max="30"
            step="5"
            onChange={handleInputChange}
            value={warmupTime}
          />
        </div>
      </div>
      <button type="submit" className={styles.fightBtn}>
        Fight!
      </button>
    </form>
  );
};

export default FightForm;
