"use client";

import styles from "./CreateWorkoutForm.module.scss";
import { useState, useRef } from "react";
import React from "react";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import createUserWorkout from "@/src/lib/actions/createUserWorkout";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import { HiArrowSmRight } from "react-icons/hi";
import { FaDeleteLeft } from "react-icons/fa6";

const CreateWorkoutForm = ({ mode }: { mode: string }) => {
  // init state
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rounds, setRounds] = useState<number>(1);
  const [roundTime, setRoundTime] = useState<number>(60);
  const [restTime, setRestTime] = useState<number>(30);
  const [warmupTime, setWarmupTime] = useState<number>(15);
  const [selectedCombos, setSelectedCombos] = useState<string[][]>([[]]);
  const [isPublic, setIsPublic] = useState<boolean>(true);

  // init hooks
  const path = usePathname();

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

  // clear selections for a specific round
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

    console.log(updatedSelectedCombos);
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

  // check mode type then handle server action
  function handleAction(mode: string) {
    if (!allSelected) {
      return;
    } else {
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
        {Array.from({ length: rounds }).map((_, roundIndex) => (
          <div key={roundIndex} className={styles.comboContainer}>
            <div className={styles.comboSelect}>
              <div className={styles.comboSelectLeft}>
                <label>Round {roundIndex + 1} combo</label>
                {selectedCombos[roundIndex]?.length > 0 && (
                  <FaDeleteLeft
                    size={20}
                    style={{ color: "var(--text-color-accent)", cursor: "pointer" }}
                    onClick={() => handleClearRound(roundIndex)}
                  />
                )}
              </div>
              <select value="" onChange={(e) => handleComboSelection(roundIndex, e.target.value)}>
                <option value="" disabled>
                  Select
                </option>
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
                <option value="Step-Back">Step-Back</option>
                <option value="Pivot-L">Pivot-L</option>
                <option value="Pivot-R">Pivot-R</option>
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

export default CreateWorkoutForm;
