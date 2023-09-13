"use client";

// styles
import styles from "./CreateEditWorkout.module.scss";

// react
import { useState } from "react";

// components
import Button from "./Button";

// next
import { usePathname, useRouter } from "next/navigation";

// utils
import editUserWorkout from "@/src/lib/actions/editUserWorkout";
import createUserWorkout from "@/src/lib/actions/createUserWorkout";

// icons
import { HiArrowSmRight } from "react-icons/hi";
import { CgSelect } from "react-icons/cg";

const CreateEditWorkout = ({ mode }: { mode: string }) => {
  // init state
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rounds, setRounds] = useState<number>(1);
  const [roundTime, setRoundTime] = useState<number>(5);
  const [restTime, setRestTime] = useState<number>(5);
  const [warmupTime, setWarmupTime] = useState<number>(5);
  const [selectedCombos, setSelectedCombos] = useState<string[][]>([[]]);
  // const [sequences, setSequences] = useState<string[]>([]);

  const [isPublic, setIsPublic] = useState<boolean>(true);

  // init hooks
  const path = usePathname();

  // format the time in "00:00" format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // handle input onChange values
  const handleInputChange = (e: { target: { name: string; value: string | number } }) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    const stringValue = String(value);
    switch (name) {
      case "title":
        setTitle(stringValue);
        break;
      case "desc":
        setDescription(stringValue);
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

  // assign selected combos and update state
  const handleComboSelection = (roundIndex: number, selectedCombo: string) => {
    const updatedSelectedCombos = [...selectedCombos];
    if (!updatedSelectedCombos[roundIndex]) {
      updatedSelectedCombos[roundIndex] = [];
    }
    updatedSelectedCombos[roundIndex].push(selectedCombo);
    setSelectedCombos(updatedSelectedCombos);
  };

  // define data structure for db entry
  const workoutData = {
    title: title,
    description: description,
    number_of_rounds: rounds,
    round_time: roundTime,
    rest_time: restTime,
    warmup_time: warmupTime,
    round_info: selectedCombos.map((seq, idx) => ({
      round: idx + 1,
      sequence: seq,
    })),
    is_public: isPublic,
  };

  // check mode type then handle server action
  function handleAction(mode: string) {
    // if (mode === "edit") {
    //   editUserWorkout(workoutData, workoutID, path);
    // } else if (mode === "create") {
    //   createUserWorkout(workoutData, path);
    // }

    createUserWorkout(workoutData, path);
  }

  return (
    <div className={styles.formWrapper}>
      <form action={() => handleAction(mode)} className={styles.form}>
        <div className={styles.titleContainer}>
          <input
            className={styles.titleInput}
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            autoFocus
          />
        </div>
        <div className={styles.row}>
          <textarea
            className={styles.titleInput}
            id="desc"
            name="desc"
            onChange={handleInputChange}
            placeholder="Describe your workout"
            rows={5}
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
        {Array.from({ length: rounds }).map((_, roundIndex) => (
          <div key={roundIndex} className={styles.comboContainer}>
            <div className={styles.comboSelect}>
              <label>Round {roundIndex + 1} combo</label>
              <select value="" onChange={(e) => handleComboSelection(roundIndex, e.target.value)}>
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Jab">Jab</option>
                <option value="Cross">Cross</option>
                <option value="Hook-L">Hook-L</option>
                {/* Add more combo options as needed */}
              </select>
            </div>
            {selectedCombos[0].length > 0 && (
              <div className={styles.comboDisplay}>
                {selectedCombos[roundIndex]?.map((combo, comboIndex) => (
                  <>
                    <span key={comboIndex}>{combo}</span>
                    <div className={styles.arrow}>
                      <HiArrowSmRight />
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button />
      </form>
    </div>
  );
};

export default CreateEditWorkout;
