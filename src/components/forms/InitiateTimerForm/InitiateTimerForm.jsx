import styles from "./InitiateTimerForm.module.scss";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { FaPlay } from "react-icons/fa";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";

const InitiateTimerForm = ({ setIsTimerActive, setIsFormView }) => {
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
    setIsFormView(false);
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
              max="20"
              step="1"
              onChange={handleInputChange}
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
