"use client";

// styles
import styles from "./CreateEditWorkout.module.scss";

// react
import { useState } from "react";

// components
import Button from "./Button";

// next
import { usePathname, useRouter } from "next/navigation";

// actions
import editUserWorkout from "@/src/lib/actions/editUserWorkout";
import createUserWorkout from "@/src/lib/actions/createUserWorkout";

const CreateEditWorkout = ({ mode, workoutID, setIsEditMode }) => {
  // init state
  const [title, setTitle] = useState("");
  const [rounds, setRounds] = useState(1);
  const [roundTime, setRoundTime] = useState(5);
  const [restTime, setRestTime] = useState(5);
  const [warmupTime, setWarmupTime] = useState(5);
  const [sequences, setSequences] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  // init hooks
  const router = useRouter();
  const path = usePathname();

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
    switch (name) {
      case "title":
        setTitle(value);
        break;
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
      default:
        break;
    }
  };

  const handleSequenceChange = (index, sequenceString) => {
    let newSequences = [...sequences];
    newSequences[index] = sequenceString.split(",");
    setSequences(newSequences);
  };

  const workoutData = {
    title: title,
    number_of_rounds: rounds,
    round_time: roundTime,
    rest_time: restTime,
    warmup_time: warmupTime,
    round_info: sequences.map((seq, idx) => ({
      round: idx + 1,
      sequence: seq,
    })),
    is_public: isPublic,
  };

  // check mode type then handle server action
  function handleAction(mode) {
    if (mode === "edit") {
      editUserWorkout(workoutData, workoutID, path);
    } else if (mode === "create") {
      createUserWorkout(workoutData, workoutID, path);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h1>New workout</h1>
      <form action={() => handleAction(mode)} className={styles.form}>
        <div className={styles.titleContainer}>
          <input
            className={styles.titleInput}
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
          />
        </div>
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
        {Array.from({ length: rounds }).map((_, index) => (
          <div className={styles.row}>
            <input
              key={index}
              type="text"
              onChange={(e) => handleSequenceChange(index, e.target.value)}
              placeholder={`Sequence for round ${index + 1} (e.g. Jab, Jab, Hook-L)`}
            />
          </div>
        ))}
        <Button setIsEditMode={setIsEditMode} />
      </form>
    </div>
  );
};

export default CreateEditWorkout;
