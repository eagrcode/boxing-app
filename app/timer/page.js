"use client";

// styles
import styles from "./page.module.scss";

// react
import { useState, useCallback, useEffect } from "react";

// utils
import getRandomCombo from "@/app/utils/getRandomCombo";

// components
import ComboCard from "@/app/components/ComboCard/ComboCard";
import Timer from "@/app/components/Timer/Timer";
import FightForm from "./components/FightForm/FightForm";
import GenerateComboForm from "./components/GenerateComboForm/GenerateComboForm";

// context
import { useFightData } from "@/app/context/useFightData";

const Fight = () => {
  // init state
  const [randomCombo, setRandomCombo] = useState({});
  const [fightMode, setFightMode] = useState(false);

  const handleGetRandomCombo = useCallback(async (difficulty) => {
    const combo = await getRandomCombo(difficulty);
    setRandomCombo(combo);
  }, []);

  return (
    <>
      {!fightMode ? (
        // setup view
        <>
          <p>Start by generating a random combo</p>
          <GenerateComboForm handleGetRandomCombo={handleGetRandomCombo} />
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
        // fight mode view
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
