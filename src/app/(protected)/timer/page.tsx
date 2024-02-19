"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import ComboCard from "@/src/components/shared/ComboCard/ComboCard";
import Timer from "@/src/components/timers/Timer/Timer";
import InitiateTimerForm from "@/src/components/forms/InitiateTimerForm/InitiateTimerForm";
import GenerateComboForm from "@/src/components/forms/GenerateComboForm/GenerateComboForm";
import { MdInfoOutline } from "react-icons/md";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import ModeView from "./ModeView/ModeView";
import ComboView from "./ComboView/ComboView";

export default function TimerPage() {
  const [randomCombo, setRandomCombo] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isModeView, setIsModeView] = useState<boolean>(true);
  const [isComboView, setIsComboView] = useState<boolean>(false);
  const [isFormView, setIsFormView] = useState<boolean>(false);
  const { isTimerActive, setIsTimerActive } = useTimerDataContext();

  const handleViewChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget;

    console.log(id);

    switch (id) {
      case "combo-view":
        setIsModeView(false);
        setIsComboView(true);
        break;

      case "form-view":
        setIsModeView(false);
        setIsComboView(false);
        setIsFormView(true);
        break;
    }
  };

  // Show select mode view
  if (isModeView) {
    return <ModeView handleViewChange={handleViewChange} />;
  }

  // Show generate combo view
  if (isComboView) {
    return (
      <ComboView
        randomCombo={randomCombo}
        setRandomCombo={setRandomCombo}
        handleViewChange={handleViewChange}
      />
    );
  }

  // Show form view
  if (isFormView) {
    return (
      <div className={styles.wrapper}>
        <InitiateTimerForm setIsTimerActive={setIsTimerActive} setIsFormView={setIsFormView} />
      </div>
    );
  }

  // Show timer view
  if (isTimerActive) {
    return (
      <div className={styles.timerWrapper}>
        <Timer
          setIsTimerActive={setIsTimerActive}
          sequence={randomCombo}
          setRandomCombo={setRandomCombo}
          isMuted={isMuted}
          setIsModeView={setIsModeView}
        />
        <div onClick={() => setIsMuted((prev) => !prev)} className={styles.muteBtn}>
          {isMuted ? <BsFillVolumeMuteFill size={25} /> : <BsFillVolumeUpFill size={25} />}
        </div>
      </div>
    );
  }
}
