"use client";

// styles
import styles from "./CreateEditWorkout.module.scss";

// react
import { useState, useRef } from "react";
import React from "react";

// components
import Button from "./Button";

// next
import { usePathname, useRouter } from "next/navigation";

// utils
import editUserWorkout from "@/src/lib/actions/editUserWorkout";
import createUserWorkout from "@/src/lib/actions/createUserWorkout";

// icons
import { HiArrowSmRight } from "react-icons/hi";
import { FaDeleteLeft } from "react-icons/fa6";

const CreateEditWorkout = ({ mode }: { mode: string }) => {
  // init state
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rounds, setRounds] = useState<number>(1);
  const [roundTime, setRoundTime] = useState<number>(5);
  const [restTime, setRestTime] = useState<number>(5);
  const [warmupTime, setWarmupTime] = useState<number>(5);
  const [selectedCombos, setSelectedCombos] = useState<string[][]>([[]]);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [comboErrors, setComboErrors] = useState<boolean[]>(
    Array.from({ length: rounds }, () => false)
  );

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

  // Function to clear selections for a specific round
  const handleClearRound = (roundIndex: number) => {
    const updatedSelectedCombos = [...selectedCombos];
    updatedSelectedCombos[roundIndex] = [];
    setSelectedCombos(updatedSelectedCombos);
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

  const selected = workoutData.round_info.map((round, index) => round.sequence);
  const allSelected = selected.length === rounds && selected.some((sub) => sub.length > 0);
  console.log(allSelected);
  console.log(selectedCombos);

  console.log(comboErrors);
  // check mode type then handle server action
  function handleAction(mode: string) {
    if (!allSelected) {
      // Update the comboErrors state for each round
      const updatedErrors = selectedCombos.map((subArray) => subArray.length === 0);
      setComboErrors(updatedErrors);
    } else {
      // Clear selectError for all rounds
      setComboErrors(Array.from({ length: rounds }, () => false));

      // Perform the action (e.g., create or edit workout)
      createUserWorkout(workoutData, path);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form
        action={() => {
          handleAction(mode);
        }}
        className={styles.form}
      >
        <div className={styles.titleContainer}>
          <input
            className={styles.titleInput}
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            autoFocus
            required
            minLength={5}
            value={title}
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
            required
            value={description}
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
          <div
            key={roundIndex}
            className={
              comboErrors[roundIndex]
                ? `${styles.comboContainer} ${styles.selectError}`
                : styles.comboContainer
            }
          >
            <div className={styles.comboSelect}>
              <div className={styles.comboSelectLeft}>
                <label>Round {roundIndex + 1} combo</label>
                {selectedCombos[roundIndex]?.length > 0 && (
                  <FaDeleteLeft
                    size={20}
                    style={{ color: "var(--accent-color-red)", cursor: "pointer" }}
                    onClick={() => handleClearRound(roundIndex)}
                  />
                )}
              </div>
              <select
                value={selectedCombos[roundIndex] ? selectedCombos[roundIndex][0] : ""}
                onChange={(e) => handleComboSelection(roundIndex, e.target.value)}
              >
                <option value="">Select</option>
                <option value="Jab">Jab</option>
                <option value="Cross">Cross</option>
                <option value="Hook-L">Hook-L</option>
                <option value="Hook-R">Hook-R</option>
                <option value="Uppercut-L">Uppercut-L</option>
                <option value="Uppercut-R">Uppercut-R</option>
                <option value="Slip-L">Slip-L</option>
                <option value="Slip-R">Slip-R</option>
                <option value="Roll-L">Roll-L</option>
                <option value="Roll-R">Roll-R</option>
              </select>
            </div>
            {selectedCombos[roundIndex]?.length > 0 && (
              <div className={styles.comboDisplay}>
                {selectedCombos[roundIndex]?.map((combo, comboIndex) => (
                  <React.Fragment key={comboIndex}>
                    <span>{combo}</span>
                    <div className={styles.arrow}>
                      <HiArrowSmRight />
                    </div>
                  </React.Fragment>
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
