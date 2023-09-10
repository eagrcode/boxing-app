// styles
import styles from "./InitiateTimerForm.module.scss";

// context
import { useFightData } from "@/src/context/useFightData";

// icons
import { FaPlay } from "react-icons/fa";

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
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.rangeContainer}>
          <div className={styles.row}>
            <label htmlFor="rounds">Rounds {rounds}</label>
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
          <div className={styles.row}>
            <label htmlFor="roundTime">Round / {formatTime(roundTime)}</label>
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
          <div className={styles.row}>
            <label htmlFor="restTime">Rest {formatTime(restTime)}</label>
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
          <div className={styles.row}>
            <label htmlFor="warmup">Warmup {formatTime(warmupTime)}</label>
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
        <button type="submit">
          <FaPlay size={50} />
        </button>
        {/* <div className={styles.row}>
    <label htmlFor="public">Set workout as public</label>
    <input
      type="checkbox"
      id="public"
      name="public"
      onChange={() => setIsPublic((prev) => !prev)}
      checked={isPublic}
    />
  </div> */}
      </form>
    </div>
  );
};

export default InitiateTimerForm;
