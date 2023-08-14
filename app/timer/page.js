"use client";

// styles
import styles from "./page.module.scss";

// react
import { useState, useCallback } from "react";

// utils

// components
import ComboCard from "@/app/components/ComboCard/ComboCard";
import Timer from "@/app/components/Timer/Timer";
import FightForm from "./components/FightForm/FightForm";
import GenerateComboForm from "./components/GenerateComboForm/GenerateComboForm";

const Fight = () => {
  // init state
  const [randomCombo, setRandomCombo] = useState({});
  const [fightMode, setFightMode] = useState(false);

  return (
    <>
      {!fightMode ? (
        // show form to initialise settings for Timer component
        <>
          <p>Start by generating a random combo</p>
          <GenerateComboForm setRandomCombo={setRandomCombo} />
          {randomCombo && (
            <ComboCard
              id={randomCombo._id}
              name={randomCombo.name}
              sequence={randomCombo.sequence}
              difficulty={randomCombo.difficulty}
            />
          )}
          <FightForm setFightMode={setFightMode} randomCombo={randomCombo} />
        </>
      ) : (
        // Show Timer once initialised and submitted
        <Timer
          setFightMode={setFightMode}
          randomCombo={randomCombo}
          setRandomCombo={setRandomCombo}
          handleGetRandomCombo={handleGetRandomCombo}
        />
      )}
    </>
  );
};

export default Fight;
