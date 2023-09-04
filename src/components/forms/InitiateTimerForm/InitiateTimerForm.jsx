// styles
import styles from "./InitiateTimerForm.module.scss";

// context
import { useFightData } from "@/src/context/useFightData";

const InitiateTimerForm = ({ setIsTimerActive, randomCombo }) => {
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
    setIsTimerActive(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.topContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="rounds">Rounds {rounds}</label>
          <label htmlFor="roundTime">Round / {formatTime(roundTime)}</label>
          <label htmlFor="restTime">Rest {formatTime(restTime)}</label>
          <label htmlFor="warmup">Warmup {formatTime(warmupTime)}</label>
        </div>
        <div className={styles.inputContainer}>
          <div>
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
      </div>
      <button type="submit" className={styles.fightBtn}>
        START
      </button>
    </form>
  );
};

export default InitiateTimerForm;
